/**
 * Serverless API route for converting PDF files to DOCX using CloudConvert.
 * Receives multipart/form-data uploads (field name: "data"), creates a CloudConvert job,
 * waits for the DOCX output, downloads it, and streams it back to the client.
 */
const CloudConvert = require('cloudconvert');
const formidable = require('formidable');
const fs = require('fs/promises');
const { Readable } = require('stream');

const MAX_UPLOAD_SIZE = 10 * 1024 * 1024; // 10 MB – mirror frontend limit or adjust if necessary.

async function parseIncomingFile(req) {
  const form = formidable({
    multiples: false,
    maxFileSize: MAX_UPLOAD_SIZE,
    allowEmptyFiles: false
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, _fields, files) => {
      if (err) {
        err.statusCode = 400;
        return reject(err);
      }

      let file = files?.data;
      if (Array.isArray(file)) {
        file = file[0];
      }

      if (!file) {
        const error = new Error('PDF file (field name "data") is required.');
        error.statusCode = 400;
        return reject(error);
      }

      const isPdf =
        file.mimetype === 'application/pdf' ||
        file.originalFilename?.toLowerCase().endsWith('.pdf');

      if (!isPdf) {
        const error = new Error('Only PDF files can be converted.');
        error.statusCode = 400;
        return reject(error);
      }

      resolve(file);
    });
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.CLOUDCONVERT_API_KEY;
  if (!apiKey) {
    console.error('CLOUDCONVERT_API_KEY is not configured.');
    return res.status(500).json({ error: 'Server misconfigured' });
  }

  let uploadedFile;
  try {
    uploadedFile = await parseIncomingFile(req);
    const fileBuffer = await fs.readFile(uploadedFile.filepath);
    await fs.unlink(uploadedFile.filepath).catch(() => {});

    const cloudConvert = new CloudConvert(apiKey);

    const job = await cloudConvert.jobs.create({
      tasks: {
        'upload-file': {
          operation: 'import/upload'
        },
        'convert-file': {
          operation: 'convert',
          input: 'upload-file',
          input_format: 'pdf',
          output_format: 'docx',
          engine: 'office',
          output: {
            filename: 'converted.docx'
          }
        },
        'export-file': {
          operation: 'export/url',
          input: 'convert-file'
        }
      }
    });

    const uploadTask = job.tasks?.find((task) => task.name === 'upload-file');
    if (!uploadTask) {
      throw new Error('Unable to initialize CloudConvert upload task.');
    }

    // Upload the PDF buffer to CloudConvert.
    await cloudConvert.tasks.upload(
      uploadTask,
      Readable.from(fileBuffer)
    );

    // Wait for the entire job (upload -> convert -> export) to finish.
    const completedJob = await cloudConvert.jobs.wait(job.id);
    const exportTask = completedJob.tasks?.find(
      (task) => task.name === 'export-file' && task.status === 'finished'
    );

    if (!exportTask?.result?.files?.length) {
      throw new Error('CloudConvert finished without returning a DOCX file.');
    }

    const downloadUrl = exportTask.result.files[0].url;
    const downloadResponse = await fetch(downloadUrl);

    if (!downloadResponse.ok) {
      throw new Error(
        `Failed to download converted file (status ${downloadResponse.status}).`
      );
    }

    const arrayBuffer = await downloadResponse.arrayBuffer();
    const docxBuffer = Buffer.from(arrayBuffer);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="converted.docx"'
    );

    return res.status(200).send(docxBuffer);
  } catch (error) {
    console.error('PDF to DOCX conversion error:', error);
    const statusCode = error.statusCode || 500;
    const message =
      statusCode >= 500
        ? 'Conversion service failed. Please try again later.'
        : error.message || 'Conversion failed.';
    if (!res.headersSent) {
      return res.status(statusCode).json({ error: message });
    }
    return undefined;
  }
};


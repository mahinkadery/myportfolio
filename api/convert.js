const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const CloudConvert = require('cloudconvert');

const MAX_FILE_SIZE_BYTES = 500 * 1024 * 1024; // 500 MB hard cap

const CONVERSION_MAP = {
  'word-to-pdf': {
    accepts: ['doc', 'docx'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'doc-to-pdf': {
    accepts: ['doc', 'docx'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'ppt-to-pdf': {
    accepts: ['ppt', 'pptx'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'pdf-to-ppt': {
    accepts: ['pdf'],
    outputFormat: 'pptx',
    defaultFilename: 'converted.pptx'
  },
  'pdf-to-doc': {
    accepts: ['pdf'],
    outputFormat: 'docx',
    defaultFilename: 'converted.docx'
  },
  'xps-to-pdf': {
    accepts: ['xps'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'rtf-to-pdf': {
    accepts: ['rtf'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'jfif-to-pdf': {
    accepts: ['jfif', 'jpg', 'jpeg'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'dwg-to-pdf': {
    accepts: ['dwg'],
    outputFormat: 'pdf',
    defaultFilename: 'converted.pdf'
  },
  'pdf-to-dxf': {
    accepts: ['pdf'],
    outputFormat: 'dxf',
    defaultFilename: 'converted.dxf'
  },
  'pdf-to-psd': {
    accepts: ['pdf'],
    outputFormat: 'psd',
    defaultFilename: 'converted.psd'
  }
};

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
};

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: MAX_FILE_SIZE_BYTES
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });

const normalizeField = (value) => {
  if (Array.isArray(value)) return value[0];
  return value;
};

const buildConversionDetails = (conversionType, file) => {
  if (!conversionType || !CONVERSION_MAP[conversionType]) {
    return { supported: false, message: 'Unsupported conversion type.' };
  }
  const entry = CONVERSION_MAP[conversionType];
  const originalName = file.originalFilename || file.newFilename || 'upload.bin';
  const ext = (path.extname(originalName) || '').replace('.', '').toLowerCase();

  if (!ext) {
    return {
      supported: false,
      message: `Unable to determine file extension for ${originalName}.`
    };
  }

  if (entry.accepts && !entry.accepts.includes(ext)) {
    return {
      supported: false,
      message: `Expected file formats: ${entry.accepts.join(', ')}. Received .${ext}.`
    };
  }

  return {
    supported: true,
    conversionType,
    inputFormat: ext,
    outputFormat: entry.outputFormat,
    defaultFilename: entry.defaultFilename || `converted.${entry.outputFormat}`,
    originalFilename: originalName,
    options: entry.options || {}
  };
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed. Use POST.' });
  }

  if (!process.env.CLOUDCONVERT_API_KEY) {
    return sendJson(res, 500, {
      error: 'CloudConvert API key is not configured on the server.'
    });
  }

  let parsed;
  try {
    parsed = await parseForm(req);
  } catch (err) {
    console.error('Form parsing error', err);
    return sendJson(res, 400, {
      error: 'Unable to process uploaded file.',
      details: err.message
    });
  }

  const uploadedFile = parsed?.files?.file;
  if (!uploadedFile) {
    return sendJson(res, 400, { error: 'A file upload is required.' });
  }

  const conversionType = normalizeField(parsed.fields?.conversionType)?.toString();
  const conversionDetails = buildConversionDetails(conversionType, uploadedFile);

  if (!conversionDetails.supported) {
    return sendJson(res, 400, { error: conversionDetails.message });
  }

  const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY);

  try {
    const job = await cloudConvert.jobs.create({
      tasks: {
        'import-1': { operation: 'import/upload' },
        'convert-1': {
          operation: 'convert',
          input: 'import-1',
          input_format: conversionDetails.inputFormat,
          output_format: conversionDetails.outputFormat,
          ...conversionDetails.options
        },
        'export-1': { operation: 'export/url', input: 'convert-1' }
      }
    });

    const uploadTask =
      job.tasks.find((task) => task.name === 'import-1') ||
      job.tasks.find((task) => task.operation === 'import/upload');

    if (!uploadTask) {
      throw new Error('CloudConvert upload task was not created.');
    }

    await cloudConvert.tasks.upload(
      uploadTask,
      fs.createReadStream(uploadedFile.filepath),
      conversionDetails.originalFilename
    );

    const completedJob = await cloudConvert.jobs.wait(job.id);
    const exportTask = completedJob.tasks.find(
      (task) => task.operation === 'export/url' && task.status === 'finished'
    );

    if (!exportTask || !exportTask.result?.files?.length) {
      throw new Error('CloudConvert export task did not return a file.');
    }

    const fileInfo = exportTask.result.files[0];
    const downloadStream = await cloudConvert.download(fileInfo.url);

    res.setHeader('Content-Type', fileInfo.content_type || 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileInfo.filename || conversionDetails.defaultFilename}"`
    );

    downloadStream.on('error', (streamErr) => {
      console.error('Download stream error', streamErr);
      if (!res.headersSent) {
        sendJson(res, 500, { error: 'Failed to stream converted file.' });
      } else {
        res.end();
      }
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('CloudConvert error', err);
    if (!res.headersSent) {
      sendJson(res, 500, {
        error: 'Conversion failed. Please try again later.',
        details: err.message
      });
    }
  } finally {
    if (uploadedFile?.filepath) {
      fs.unlink(uploadedFile.filepath, () => {});
    }
  }
};


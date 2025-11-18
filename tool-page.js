(function () {
  function initToolFlow(flow) {
    const fileInput = flow.querySelector('input[type="file"]');
    const dropZone = flow.querySelector('[data-drop-zone]');
    const convertBtn = flow.querySelector('[data-convert]');
    const downloadBtn = flow.querySelector('[data-download]');
    const statusEl = flow.querySelector('[data-status]');
    const labelEl = flow.querySelector('[data-file-label]');
    const spinnerEl = flow.querySelector('[data-spinner]');
    const toolName = flow.getAttribute('data-tool-name') || 'Converter';
    const outputExt = flow.getAttribute('data-output-ext') || '.txt';
    let currentFile = null;
    let resultUrl = null;
    let resultName = null;
    let resultBlob = null;
    const dragActiveClass = 'is-dragging';

    if (convertBtn) {
      convertBtn.disabled = true;
    }
    if (downloadBtn) {
      downloadBtn.disabled = true;
    }

    const showStatus = (message, tone) => {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.classList.remove('text-green-500', 'text-red-500');
      if (tone === 'success') statusEl.classList.add('text-green-500');
      if (tone === 'error') statusEl.classList.add('text-red-500');
    };

    const toggleSpinner = (show) => {
      if (!spinnerEl) return;
      spinnerEl.classList.toggle('hidden', !show);
    };

    const revokeResult = () => {
      if (resultUrl) {
        URL.revokeObjectURL(resultUrl);
        resultUrl = null;
        resultName = null;
      }
      resultBlob = null;
      if (downloadBtn) {
        downloadBtn.disabled = true;
      }
    };

    const reset = () => {
      revokeResult();
      currentFile = null;
      if (fileInput) fileInput.value = '';
      if (labelEl) labelEl.textContent = 'No file selected.';
      if (convertBtn) convertBtn.disabled = true;
      showStatus('Waiting for file…');
    };

    const handleFiles = (files) => {
      if (!files || !files.length) return;
      currentFile = files[0];
      if (labelEl) labelEl.textContent = `Selected: ${currentFile.name}`;
      if (convertBtn) convertBtn.disabled = false;
      showStatus('Ready to convert.');
    };

    if (dropZone && fileInput) {
      dropZone.addEventListener('click', () => fileInput.click());
      dropZone.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropZone.classList.add(dragActiveClass);
      });
      ['dragleave', 'dragend', 'drop'].forEach((evt) => {
        dropZone.addEventListener(evt, (event) => {
          event.preventDefault();
          dropZone.classList.remove(dragActiveClass);
        });
      });
      dropZone.addEventListener('drop', (event) => {
        if (event.dataTransfer?.files?.length) {
          fileInput.files = event.dataTransfer.files;
          handleFiles(event.dataTransfer.files);
        }
      });
    }

    if (fileInput) {
      fileInput.addEventListener('change', (event) => handleFiles(event.target.files));
    }

    const buildDefaultName = () => {
      const baseNameMatch = currentFile.name.includes('.')
        ? currentFile.name.replace(/\.[^.]+$/, '')
        : currentFile.name;
      return `${baseNameMatch}${outputExt.startsWith('.') ? outputExt : `.${outputExt}`}`;
    };

    const getConversionType = () => flow.getAttribute('data-conversion-type');
    const getUnsupportedMessage = () =>
      flow.getAttribute('data-unsupported-message') ||
      'This conversion is not available yet. Please try another workflow.';

    const parseFilenameFromHeader = (header) => {
      if (!header) return null;
      const utfMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
      if (utfMatch?.[1]) {
        return decodeURIComponent(utfMatch[1]);
      }
      const quotedMatch = header.match(/filename=\"?([^\";]+)\"?/i);
      if (quotedMatch?.[1]) {
        return quotedMatch[1];
      }
      return null;
    };

    const fetchErrorMessage = async (response) => {
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          const payload = await response.json();
          return payload?.error || payload?.message || JSON.stringify(payload);
        } catch (error) {
          return 'Conversion failed.';
        }
      }
      try {
        return (await response.text()) || 'Conversion failed.';
      } catch (error) {
        return 'Conversion failed.';
      }
    };

    if (convertBtn) {
      convertBtn.addEventListener('click', async () => {
        if (!currentFile) {
          showStatus('Please add a file before converting.', 'error');
          return;
        }

        revokeResult();
        convertBtn.disabled = true;
        toggleSpinner(true);
        showStatus(`Processing ${currentFile.name}…`);

        const conversionType = getConversionType();
        if (!conversionType) {
          showStatus(getUnsupportedMessage(), 'error');
          toggleSpinner(false);
          convertBtn.disabled = false;
          return;
        }

        try {
          const formData = new FormData();
          formData.append('file', currentFile);
          formData.append('conversionType', conversionType);

          const response = await fetch('/api/convert', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            const message = await fetchErrorMessage(response);
            throw new Error(message || 'Conversion failed.');
          }

          const blob = await response.blob();
          const contentDisposition = response.headers.get('content-disposition');
          const suggestedName = parseFilenameFromHeader(contentDisposition);

          resultBlob = blob;
          if (resultUrl) {
            URL.revokeObjectURL(resultUrl);
          }
          resultUrl = URL.createObjectURL(blob);
          resultName = suggestedName || buildDefaultName();

          if (downloadBtn) {
            downloadBtn.disabled = false;
          }
          showStatus('Conversion complete. Download your result to continue.', 'success');
        } catch (error) {
          console.error(error);
          showStatus(error.message || 'Conversion failed. Please try again.', 'error');
          revokeResult();
        } finally {
          toggleSpinner(false);
          convertBtn.disabled = false;
        }
      });
    }

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (!resultUrl || !resultName) {
          showStatus('Please convert a file first.', 'error');
          return;
        }
        const link = document.createElement('a');
        link.href = resultUrl;
        link.download = resultName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showStatus(`Downloaded ${resultName}`, 'success');
      });
    }

    flow.addEventListener('reset-flow', reset);
  }

  const start = () => {
    document.querySelectorAll('[data-tool-flow]').forEach(initToolFlow);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

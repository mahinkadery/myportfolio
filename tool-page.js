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

    if (convertBtn) {
      convertBtn.addEventListener('click', () => {
        if (!currentFile) {
          showStatus('Please add a file before converting.', 'error');
          return;
        }

        revokeResult();
        convertBtn.disabled = true;
        toggleSpinner(true);
        showStatus(`Processing ${currentFile.name}…`);

        setTimeout(() => {
          const baseNameMatch = currentFile.name.includes('.')
            ? currentFile.name.replace(/\.[^.]+$/, '')
            : currentFile.name;
          resultName = `${baseNameMatch}${outputExt}`;
          const simulatedContent = [
            `${toolName} placeholder output`,
            `Source file: ${currentFile.name}`,
            'This is a demo artifact. Connect your backend to replace it.',
            `Generated at: ${new Date().toISOString()}`
          ].join('\n');
          const blob = new Blob([simulatedContent], { type: 'text/plain' });
          resultUrl = URL.createObjectURL(blob);
          if (downloadBtn) {
            downloadBtn.disabled = false;
          }
          showStatus('Conversion complete. Download your result to continue.', 'success');
          toggleSpinner(false);
          convertBtn.disabled = false;
        }, 900);
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

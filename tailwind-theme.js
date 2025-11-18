(function () {
  const config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#2b6cee',
          'background-light': '#f5f5f7',
          'background-dark': '#070b16',
          'text-light': '#0a0a0a',
          'text-dark': '#f5f5f5',
          'muted-light': '#aeaeb2',
          'muted-dark': '#cfd0d4',
          'text-muted-light': '#aeaeb2',
          'text-muted-dark': '#cfd0d4',
          'border-light': 'rgba(10, 10, 10, 0.08)',
          'border-dark': 'rgba(255, 255, 255, 0.15)'
        },
        fontFamily: {
          display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif']
        }
      }
    }
  };

  const MAX_ATTEMPTS = 40;
  function applyConfig(attempt = 0) {
    if (window.tailwind) {
      window.tailwind.config = config;
      return;
    }
    if (attempt >= MAX_ATTEMPTS) {
      console.warn('tailwind-theme: Unable to apply Tailwind config.');
      return;
    }
    setTimeout(() => applyConfig(attempt + 1), 10 * (attempt + 1));
  }

  applyConfig();
})();


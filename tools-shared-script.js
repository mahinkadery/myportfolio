// Shared script for all tool pages - Dark Mode Toggle
(function() {
  function initDarkMode() {
    const html = document.documentElement;
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.classList.remove('light', 'dark');
    html.classList.add(currentTheme);
    
    // Update toggle button icon if it exists
    if (darkModeToggle) {
      updateDarkModeIcon(currentTheme);
    }
    
    // Toggle dark mode on button click
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
        html.classList.remove('light', 'dark');
        html.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
      });
    }
  }

  function updateDarkModeIcon(theme) {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
  } else {
    initDarkMode();
  }
})();


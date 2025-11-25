// Shared script for all tool pages - Dark Mode Toggle & Lenis Smooth Scroll
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

  // Initialize Lenis Smooth Scroll
  function initLenis() {
    // Check if Lenis is available (loaded from CDN)
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing for better performance
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8, // Reduced for snappier feel
        smoothTouch: false,
        touchMultiplier: 1.5,
        infinite: false,
        syncTouch: true,
      });

      // Optimized RAF with performance check
      let lastTime = 0;
      function raf(time) {
        lenis.raf(time);
        // Throttle to maintain 60fps
        if (time - lastTime >= 16) {
          requestAnimationFrame(raf);
          lastTime = time;
        } else {
          requestAnimationFrame(raf);
        }
      }

      requestAnimationFrame(raf);

      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            lenis.scrollTo(href, { offset: 0, duration: 1.0 });
          }
        });
      });

      // Expose lenis instance globally for potential external access
      window.lenis = lenis;
    }
  }

  // Initialize on DOM ready
  function init() {
    initDarkMode();
    
    // Wait for Lenis to load if it's not already available
    if (typeof Lenis !== 'undefined') {
      initLenis();
    } else {
      // Retry after a short delay if Lenis hasn't loaded yet
      setTimeout(() => {
        if (typeof Lenis !== 'undefined') {
          initLenis();
        }
      }, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


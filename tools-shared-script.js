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
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    
    if (darkModeToggle) {
      const icon = darkModeToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    }
    
    if (darkModeToggleMobile) {
      const icon = darkModeToggleMobile.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
      }
    }
  }
  
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const mobileMenu = document.getElementById('mobileMenu');
    const html = document.documentElement;

    if (!mobileMenuBtn || !mobileMenu) return;

    const closeMobileMenuFunc = () => {
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    };

    const openMobileMenuFunc = () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('hidden');
      }
    };

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        openMobileMenuFunc();
      } else {
        closeMobileMenuFunc();
      }
    });

    // Close menu on close button
    if (closeMobileMenu) {
      closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
    }

    // Dark mode toggle in mobile menu
    if (darkModeToggleMobile) {
      darkModeToggleMobile.addEventListener('click', () => {
        const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
        html.classList.remove('light', 'dark');
        html.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme);
      });
    }

    // Close menu when clicking on links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenuFunc);
    });

    // Close menu when clicking backdrop
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        closeMobileMenuFunc();
      }
    });
  }

  // Initialize Lenis Smooth Scroll
  function initLenis() {
    // Detect mobile devices - disable smooth scroll on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768 || 'ontouchstart' in window;
    
    if (isMobile) {
      // Skip Lenis initialization on mobile devices
      return;
    }
    
    // Detect Windows OS for reduced smoothness
    const isWindows = navigator.platform.indexOf('Win') > -1 || navigator.userAgent.indexOf('Windows') > -1;
    
    // Adjust settings based on OS
    const duration = isWindows ? 0.5 : 0.8; // Faster on Windows
    const wheelMultiplier = isWindows ? 1.2 : 0.8; // More responsive on Windows
    
    // Check if Lenis is available (loaded from CDN)
    if (typeof Lenis !== 'undefined') {
      const lenis = new Lenis({
        duration: duration,
        easing: (t) => 1 - Math.pow(1 - t, 3), // Simpler easing for better performance
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: wheelMultiplier,
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
    initMobileMenu();
    
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


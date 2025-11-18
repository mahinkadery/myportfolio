const TOOL_LINKS = [
    { label: 'Convert Word to PDF', href: 'word-to-pdf.html', description: 'Generate LibreOffice scripts to batch DOC/DOCX into searchable PDFs.' },
    { label: 'Convert PDF to PPT', href: 'pdf-to-ppt.html', description: 'Rebuild slide decks locally using pdf.js and PptxGenJS—no uploads required.' },
    { label: 'DOC to PDF Converter', href: 'doc-to-pdf.html', description: 'Automate legacy .doc exports using unoconv headless flows.' },
    { label: 'Convert PPT to PDF', href: 'ppt-to-pdf.html', description: 'LibreOffice Impress CLI recipes for instant deck-to-PDF handoff.' },
    { label: 'Convert XPS to PDF', href: 'xps-to-pdf.html', description: 'GhostXPS commands to normalize Microsoft XPS archives into PDFs.' },
    { label: 'PDF to DOC Converter', href: 'pdf-to-doc.html', description: 'pdftotext plus Pandoc script generator for editable DOCX files.' },
    { label: 'Convert DWG to PDF', href: 'dwg-to-pdf.html', description: 'LibreDWG + Inkscape workflow that preserves CAD line work.' },
    { label: 'Convert RTF to PDF', href: 'rtf-to-pdf.html', description: 'Cross-platform textutil/LibreOffice automation for styled RTFs.' },
    { label: 'PDF to PSD Converter', href: 'pdf-to-psd.html', description: 'ImageMagick pipeline for layered PSD exports ready for retouch.' },
    { label: 'Shree Lipi Converter', href: 'shree-lipi-converter.html', description: 'Transliterate ShreeLipi text to Unicode PDFs with open-source tools.' },
    { label: 'YouTube to MP3 Converter 320 kbps', href: 'youtube-to-mp3-320.html', description: 'yt-dlp + FFmpeg recipe for attribution-friendly 320 kbps audio.' },
    { label: 'PNR Converter', href: 'pnr-converter.html', description: 'Python helper to turn railway PNR manifests into shareable PDFs.' },
    { label: 'BIN to PDF Converter', href: 'bin-to-pdf.html', description: 'Hex dump firmware and typeset it into PDFs for audits.' },
    { label: 'PDF to Corel Draw Converter', href: 'pdf-to-corel.html', description: 'Use pstoedit to export CMX files that open in CorelDRAW.' },
    { label: 'PDF to DXF Converter', href: 'pdf-to-dxf.html', description: 'Extract vectors for CNC and CAD workflows using pstoedit.' },
    { label: 'JFIF to PDF Converter', href: 'jfif-to-pdf.html', description: 'Pure in-browser image-to-PDF exporter powered by jsPDF.' },
    { label: 'Convert IPYNB to PDF', href: 'ipynb-to-pdf.html', description: 'nbconvert script template for sharing Jupyter notebooks.' },
    { label: 'Convert RAR to PDF', href: 'rar-to-pdf.html', description: 'Unpack archives and stitch assets into a single PDF offline.' },
    { label: 'Convert PRN to PDF', href: 'prn-to-pdf.html', description: 'Ghostscript-based workflow for printer spool (PRN/PS) files.' },
    { label: 'PDF to Audio Converter', href: 'pdf-to-audio.html', description: 'pdftotext + eSpeak NG + FFmpeg script for spoken PDFs.' }
];

// Dark Mode Toggle
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

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    const closeMobileMenuFunc = () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            body.style.overflow = 'auto';
        }
    };
    
    const openMobileMenuFunc = () => {
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            body.style.overflow = 'hidden';
        }
    };
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                openMobileMenuFunc();
            } else {
                closeMobileMenuFunc();
            }
        });
        
        // Close button
        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', closeMobileMenuFunc);
        }
        
        // Mobile dark mode toggle
        if (darkModeToggleMobile) {
            darkModeToggleMobile.addEventListener('click', () => {
                const html = document.documentElement;
                const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
                html.classList.remove('light', 'dark');
                html.classList.add(newTheme);
                localStorage.setItem('theme', newTheme);
                updateDarkModeIcon(newTheme);
                // Update mobile toggle icon
                const icon = darkModeToggleMobile.querySelector('.material-symbols-outlined');
                if (icon) {
                    icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
                }
            });
        }
        
        // Close menu when clicking a link
        const menuLinks = mobileMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenuFunc);
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenuFunc();
            }
        });
    }
}

// Dropdowns
function initDropdowns() {
    const dropdowns = document.querySelectorAll('[data-dropdown]');
    if (!dropdowns.length) return;

    const closeAllDropdowns = () => {
        document.querySelectorAll('[data-dropdown-menu]').forEach((menu) => {
            menu.classList.add('hidden');
        });

        document.querySelectorAll('[data-dropdown-icon]').forEach((icon) => {
            icon.classList.remove('rotate-180');
        });
    };

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');
        const menu = dropdown.querySelector('[data-dropdown-menu]');
        const icon = dropdown.querySelector('[data-dropdown-icon]');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = !menu.classList.contains('hidden');
            closeAllDropdowns();

            if (!isOpen) {
                menu.classList.remove('hidden');
                icon?.classList.add('rotate-180');
            }
        });

        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    document.addEventListener('click', closeAllDropdowns);
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Validation and Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('input[placeholder*="name"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };
            
            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual backend endpoint)
            showNotification('Message sent successfully! (Demo mode)', 'success');
            contactForm.reset();
            
            // For actual implementation, uncomment and configure:
            /*
            try {
                const response = await fetch('YOUR_BACKEND_ENDPOINT', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });
                
                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    showNotification('Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                showNotification('An error occurred. Please try again later.', 'error');
            }
            */
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function populateToolMenus() {
    if (!Array.isArray(TOOL_LINKS)) return;

    document.querySelectorAll('[data-tools-menu]').forEach((menu) => {
        menu.innerHTML = '';
        TOOL_LINKS.forEach((tool) => {
            const link = document.createElement('a');
            link.href = tool.href;
            link.textContent = tool.label;
            link.className = 'block rounded-lg px-3 py-2 text-sm text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10 transition-colors';
            menu.appendChild(link);
        });
    });

    document.querySelectorAll('[data-tools-menu-mobile]').forEach((menu) => {
        menu.innerHTML = '';
        TOOL_LINKS.forEach((tool) => {
            const link = document.createElement('a');
            link.href = tool.href;
            link.textContent = tool.label;
            link.className = 'block text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors';
            menu.appendChild(link);
        });
    });
}

function populateToolsHub() {
    const grid = document.getElementById('toolsHubGrid');
    if (!grid || !Array.isArray(TOOL_LINKS)) return;
    grid.innerHTML = '';

    TOOL_LINKS.forEach((tool) => {
        const card = document.createElement('a');
        card.href = tool.href;
        card.className = 'group flex transform-gpu flex-col gap-4 rounded-2xl p-6 glassmorphism soft-shadow transition-transform duration-300 hover:-translate-y-1.5';
        card.innerHTML = `
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-text-light dark:text-text-dark">${tool.label}</h3>
                <span class="material-symbols-outlined text-primary transition group-hover:translate-x-1">north_east</span>
            </div>
            <p class="text-sm text-muted-light dark:text-muted-dark">${tool.description || ''}</p>
        `;
        grid.appendChild(card);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initMobileMenu();
    initDropdowns();
    initSmoothScroll();
    initContactForm();
    populateToolMenus();
    populateToolsHub();
    const yearSpan = document.getElementById('yearSpan');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});


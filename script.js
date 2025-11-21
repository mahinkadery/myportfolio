const CATEGORY_FILTERS = [
    'All',
    'Text & Writing',
    'Calculators & Converters',
    'Productivity',
    'Developer Tools',
    'PDF Suite',
    'Image Tools',
    'Design & Color',
    'Fun & Games',
    'Study Tools',
    'Portfolio Tools'
];

const TOOL_LINKS = [
    {
        label: 'Word & Character Counter',
        href: '/tools/word-character-counter',
        description: 'Live word and character counts as you type.',
        difficulty: '🟢',
        category: 'Text & Writing'
    },
    {
        label: 'Case Converter',
        href: '/tools/case-converter',
        description: 'Switch between upper, lower, title, and sentence case instantly.',
        difficulty: '🟢',
        category: 'Text & Writing'
    },
    {
        label: 'Whitespace Cleaner',
        href: '/tools/whitespace-cleaner',
        description: 'Trim leading/trailing spaces, collapse whitespace, remove blank lines.',
        difficulty: '🟢',
        category: 'Text & Writing'
    },
    {
        label: 'Text Reverser',
        href: '/tools/text-reverser',
        description: 'Reverse the entire text or each word individually.',
        difficulty: '🟢',
        category: 'Text & Writing'
    },
    {
        label: 'Duplicate Line Remover',
        href: '/tools/duplicate-line-remover',
        description: 'Remove duplicate lines while keeping the original order.',
        difficulty: '🟡',
        category: 'Text & Writing'
    },
    {
        label: 'Find & Replace Tool',
        href: '/tools/find-replace-tool',
        description: 'Replace every occurrence of a target string with ease.',
        difficulty: '🟡',
        category: 'Text & Writing'
    },
    {
        label: 'URL Encoder / Decoder',
        href: '/tools/url-encoder-decoder',
        description: 'encodeURIComponent / decodeURIComponent helpers for URLs.',
        difficulty: '🟡',
        category: 'Text & Writing'
    },
    {
        label: 'Base64 Encoder / Decoder',
        href: '/tools/base64-encoder-decoder',
        description: 'Unicode-safe Base64 conversions using btoa/atob.',
        difficulty: '🟡',
        category: 'Text & Writing'
    },
    {
        label: 'Markdown Previewer',
        href: '/tools/markdown-previewer',
        description: 'Split-pane Markdown typing with live HTML preview.',
        difficulty: '🟠',
        category: 'Text & Writing'
    },
    {
        label: 'Text Comparator',
        href: '/tools/text-comparator',
        description: 'Line-by-line diff highlighting additions and removals.',
        difficulty: '🟠',
        category: 'Text & Writing'
    },
    {
        label: 'Basic Calculator',
        href: '/tools/basic-calculator',
        description: 'Keyboard-friendly calculator for everyday math.',
        difficulty: '🟢',
        category: 'Calculators & Converters'
    },
    {
        label: 'Percentage Calculator',
        href: '/tools/percentage-calculator',
        description: 'Find X% of a number and measure percent change.',
        difficulty: '🟢',
        category: 'Calculators & Converters'
    },
    {
        label: 'Discount / Sale Price Calculator',
        href: '/tools/discount-calculator',
        description: 'Compute sale price and savings from any discount.',
        difficulty: '🟢',
        category: 'Calculators & Converters'
    },
    {
        label: 'Tip Calculator',
        href: '/tools/tip-calculator',
        description: 'Split bills with tip and see per-person totals.',
        difficulty: '🟢',
        category: 'Calculators & Converters'
    },
    {
        label: 'Loan / EMI Calculator',
        href: '/tools/loan-emi-calculator',
        description: 'Standard EMI formula with interest and totals.',
        difficulty: '🟡',
        category: 'Calculators & Converters'
    },
    {
        label: 'BMI Calculator',
        href: '/tools/bmi-calculator',
        description: 'Calculate BMI in kg/m and see the category.',
        difficulty: '🟢',
        category: 'Calculators & Converters'
    },
    {
        label: 'Unit Converter',
        href: '/tools/unit-converter',
        description: 'Length, weight, and temperature conversions.',
        difficulty: '🟡',
        category: 'Calculators & Converters'
    },
    {
        label: 'Age Calculator',
        href: '/tools/age-calculator',
        description: 'Detailed age output in years, months, days.',
        difficulty: '🟡',
        category: 'Calculators & Converters'
    },
    {
        label: 'Time Zone Difference Helper',
        href: '/tools/timezone-difference',
        description: 'Compare time zones and convert meeting times.',
        difficulty: '🟠',
        category: 'Calculators & Converters'
    },
    {
        label: 'GPA / Grade Calculator',
        href: '/tools/gpa-calculator',
        description: 'Weighted GPA with customizable subjects.',
        difficulty: '🟡',
        category: 'Calculators & Converters'
    },
    {
        label: 'Pomodoro Timer',
        href: '/tools/pomodoro-timer',
        description: 'Alternates 25 min focus / 5 min break cycles with alerts.',
        difficulty: '🟡',
        category: 'Productivity'
    },
    {
        label: 'Countdown Timer',
        href: '/tools/countdown-timer',
        description: 'Quick timer with start/pause/reset controls.',
        difficulty: '🟢',
        category: 'Productivity'
    },
    {
        label: 'Stopwatch',
        href: '/tools/stopwatch',
        description: 'Track elapsed time and record lap splits.',
        difficulty: '🟢',
        category: 'Productivity'
    },
    {
        label: 'Daily To-Do List',
        href: '/tools/daily-todo-list',
        description: 'LocalStorage-backed task list with checkboxes.',
        difficulty: '🟡',
        category: 'Productivity'
    },
    {
        label: 'Habit Tracker',
        href: '/tools/habit-tracker',
        description: 'Minimal weekly grid to tick off habits.',
        difficulty: '🟠',
        category: 'Productivity'
    },
    {
        label: 'Goal Progress Tracker',
        href: '/tools/goal-progress-tracker',
        description: 'Input current vs target to see progress bars.',
        difficulty: '🟡',
        category: 'Productivity'
    },
    {
        label: 'Random Decision Picker',
        href: '/tools/random-decision-picker',
        description: 'Paste options and let the tool choose one.',
        difficulty: '🟢',
        category: 'Productivity'
    },
    {
        label: 'Meeting Time Helper',
        href: '/tools/meeting-time-helper',
        description: 'Convert meeting times between time zones instantly.',
        difficulty: '🟠',
        category: 'Productivity'
    },
    {
        label: 'JSON Formatter & Validator',
        href: '/tools/json-formatter',
        description: 'Validate JSON and pretty-print safely.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Regex Tester',
        href: '/tools/regex-tester',
        description: 'Test patterns, flags, and view all matches.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'UUID / Random ID Generator',
        href: '/tools/uuid-generator',
        description: 'Generate UUID v4 identifiers with history.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Base64 ↔ File Tool',
        href: '/tools/base64-file-tool',
        description: 'Encode files to Base64 or decode Base64 back to files.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Color Converter',
        href: '/tools/color-converter',
        description: 'Convert HEX, RGB, and HSL with live preview.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'JWT Decoder',
        href: '/tools/jwt-decoder',
        description: 'Decode JWT header & payload (no signature check).',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'HTML Escape / Unescape',
        href: '/tools/html-escape-tool',
        description: 'Safely convert between raw text and HTML entities.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'CSS Box Shadow Generator',
        href: '/tools/css-box-shadow',
        description: 'Fine-tune shadows with sliders and copy CSS.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'CSS Border Radius Previewer',
        href: '/tools/css-border-radius',
        description: 'Adjust each corner radius and grab the CSS.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Responsive Breakpoint Preview',
        href: '/tools/responsive-preview',
        description: 'Load a URL and preview at common device widths.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'HTTP Status Code Explorer',
        href: '/tools/http-status-explorer',
        description: 'Browse and search HTTP status codes (1xx–5xx) with explanations.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'REST API Request Builder',
        href: '/tools/rest-api-builder',
        description: 'Build and test HTTP requests. Note: Many APIs will be blocked by CORS.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'URL Parser & Inspector',
        href: '/tools/url-parser',
        description: 'Parse URLs to see protocol, host, path, query params, hash, and more.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Code Snippet Highlighter',
        href: '/tools/code-highlighter',
        description: 'Paste code and choose a language to get syntax-highlighted HTML.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'JSON Schema Generator',
        href: '/tools/json-schema-generator',
        description: 'Infer a basic JSON schema (types, required keys) from JSON input.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'JSON ↔ CSV Converter',
        href: '/tools/json-csv-converter',
        description: 'Convert arrays of objects between JSON and CSV formats.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Git Command Cheat Sheet',
        href: '/tools/git-cheatsheet',
        description: 'Searchable reference for common Git commands and explanations.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'HTTP Headers Explainer',
        href: '/tools/http-headers-explainer',
        description: 'Learn about common HTTP headers with descriptions and examples.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'JSON Path Tester',
        href: '/tools/json-path-tester',
        description: 'Test JSONPath-like expressions or dot notation on JSON data.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Download Videos in 4K',
        href: '/tools/video-downloader',
        description: 'Send a URL to an Apify actor and inspect the JSON result.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Hash Calculator',
        href: '/tools/hash-calculator',
        description: 'Compute SHA-256 and SHA-1 hashes using the Web Crypto API.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Hashing Demo (Avalanche Effect)',
        href: '/tools/hashing-demo',
        description: 'Compare hashes side-by-side to see how tiny input changes completely change the hash.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Password Strength Estimator',
        href: '/tools/password-strength',
        description: 'Check password strength, length, character classes, and common patterns.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Secure vs Insecure URL Demo',
        href: '/tools/secure-url-demo',
        description: 'Compare HTTP vs HTTPS and understand why secure connections matter.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'OWASP Top 10 Learning Cards',
        href: '/tools/owasp-top10',
        description: 'Learn about the OWASP Top 10 web application security risks. Click cards to flip.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Input Validation Playground',
        href: '/tools/input-validation-playground',
        description: 'Compare safe vs unsafe input handling. Learn why encoding/escaping matters.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'CSP (Content Security Policy) Visualizer',
        href: '/tools/csp-visualizer',
        description: 'Parse CSP directives and understand how they help mitigate XSS attacks.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Strong Secret Generator',
        href: '/tools/secret-generator',
        description: 'Generate cryptographically secure random strings for API keys, secrets, and tokens.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Phishing URL Checklist Tool',
        href: '/tools/phishing-checklist',
        description: 'Analyze URLs for common phishing indicators. Always manually verify suspicious URLs.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Viewport & Breakpoint Tester',
        href: '/tools/viewport-tester',
        description: 'View current viewport dimensions in real-time and preview typical breakpoints.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Responsive Image Helper',
        href: '/tools/responsive-image-helper',
        description: 'Generate &lt;img srcset&gt; and &lt;picture&gt; examples for responsive images.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'LocalStorage Inspector',
        href: '/tools/localstorage-inspector',
        description: 'View all localStorage keys and values. Clear data to reset tools.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Color Blindness Preview',
        href: '/tools/color-blindness-preview',
        description: 'Preview how colors appear to people with different types of color vision deficiency.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Accessibility Contrast & Font Size Helper',
        href: '/tools/accessibility-helper',
        description: 'Check WCAG contrast ratios and recommended font sizes for accessibility.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Cron Expression Explainer',
        href: '/tools/cron-explainer',
        description: 'Parse cron expressions and see human-readable explanations and next run times.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Environment Variable Template Builder',
        href: '/tools/env-builder',
        description: 'Create .env-style key=value lines and download as text.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'API Error Message Catalog',
        href: '/tools/api-error-catalog',
        description: 'Searchable reference of typical JSON error formats (REST, GraphQL, etc.) with explanations.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Dockerfile Layer Visualizer',
        href: '/tools/dockerfile-visualizer',
        description: 'Parse Dockerfile and visualize layers and build order.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'YAML/JSON Formatter & Linter',
        href: '/tools/yaml-json-formatter',
        description: 'Format and validate JSON and YAML. Convert between formats.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'JSON → TypeScript Interface Generator',
        href: '/tools/json-to-typescript',
        description: 'Generate TypeScript interfaces from JSON with inferred field types.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'TypeScript to JSDoc Converter',
        href: '/tools/typescript-to-jsdoc',
        description: 'Convert TypeScript type annotations into JSDoc comments for JavaScript.',
        difficulty: '🟠',
        category: 'Developer Tools'
    },
    {
        label: 'Regex to Plain English Helper',
        href: '/tools/regex-to-english',
        description: 'Break down simple regex patterns into human-readable descriptions.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Slug Generator for URLs',
        href: '/tools/slug-generator',
        description: 'Convert text into URL-friendly slugs: lowercase, replace spaces with hyphens.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Commit Message Template Helper',
        href: '/tools/commit-message-helper',
        description: 'Generate conventional commit-style messages with type and details.',
        difficulty: '🟢',
        category: 'Developer Tools'
    },
    {
        label: 'Multi-Snippet Clipboard Manager',
        href: '/tools/multi-clipboard',
        description: 'Store multiple code snippets and copy them to your clipboard.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'URL Builder for UTM Tags',
        href: '/tools/utm-builder',
        description: 'Build URLs with UTM parameters for tracking campaign performance.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Curl Command Builder',
        href: '/tools/curl-builder',
        description: 'Build curl commands from URL, method, headers, and body.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Color Palette Generator',
        href: '/tools/color-palette-generator',
        description: 'Click to copy random HEX palettes for inspiration.',
        difficulty: '🟡',
        category: 'Design & Color'
    },
    {
        label: 'Gradient Generator',
        href: '/tools/gradient-generator',
        description: 'Create linear gradients and copy the CSS.',
        difficulty: '🟠',
        category: 'Design & Color'
    },
    {
        label: 'Contrast Checker',
        href: '/tools/contrast-checker',
        description: 'Compute WCAG ratios for foreground/background colors.',
        difficulty: '🟠',
        category: 'Design & Color'
    },
    {
        label: 'Favicon Previewer',
        href: '/tools/favicon-previewer',
        description: 'Preview uploads at 16/32/48/64px sizes for favicons.',
        difficulty: '🟠',
        category: 'Design & Color'
    },
    {
        label: 'Image Resizer',
        href: '/tools/image-resizer',
        description: 'Client-side resize via canvas and download the PNG.',
        difficulty: '🟠',
        category: 'Image Tools'
    },
    {
        label: 'PDF Merger',
        href: '/tools/pdf-merger',
        description: 'Merge multiple PDF files into a single PDF document.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Splitter',
        href: '/tools/pdf-splitter',
        description: 'Split a PDF into individual pages. All pages downloaded as ZIP.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Rotator',
        href: '/tools/pdf-rotator',
        description: 'Rotate all pages in a PDF document by 90, 180, or 270 degrees.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Watermark',
        href: '/tools/pdf-watermark',
        description: 'Add a text watermark to all pages of a PDF document.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Encrypt/Protect',
        href: '/tools/pdf-encrypt',
        description: 'Protect a PDF with a password using standard encryption.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Page Numbers',
        href: '/tools/pdf-page-numbers',
        description: 'Add page numbers (1/N, 2/N, etc.) to all pages of a PDF.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'Images to PDF',
        href: '/tools/images-to-pdf',
        description: 'Convert multiple images into a single PDF document.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF to JPG',
        href: '/tools/pdf-to-jpg',
        description: 'Convert each page of a PDF into JPG images. Downloaded as ZIP.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'PDF Editor',
        href: '/tools/pdf-editor',
        description: 'Upload a PDF and edit text directly on each page. Click any word to edit it inline.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'Excel to PDF',
        href: '/tools/excel-to-pdf',
        description: 'Convert Excel files to PDF using browser print functionality.',
        difficulty: '🟠',
        category: 'PDF Suite'
    },
    {
        label: 'Image Converter',
        href: '/tools/image-converter',
        description: 'Convert images between PNG, JPG, and WEBP formats.',
        difficulty: '🟡',
        category: 'Image Tools'
    },
    {
        label: 'Image Compressor',
        href: '/tools/image-compressor',
        description: 'Compress images to reduce file size while maintaining quality.',
        difficulty: '🟡',
        category: 'Image Tools'
    },
    {
        label: 'QR Code Generator',
        href: '/tools/qr-generator',
        description: 'Generate QR codes for text, URLs, or any string. Download as PNG.',
        difficulty: '🟡',
        category: 'Developer Tools'
    },
    {
        label: 'Random Quote Generator',
        href: '/tools/random-quote-generator',
        description: 'Static list of uplifting quotes/jokes on shuffle.',
        difficulty: '🟢',
        category: 'Fun & Games'
    },
    {
        label: 'Password Generator',
        href: '/tools/password-generator',
        description: 'Length + character sets produce strong passwords.',
        difficulty: '🟡',
        category: 'Fun & Games'
    },
    {
        label: 'Rock–Paper–Scissors',
        href: '/tools/rock-paper-scissors',
        description: 'Classic showdown versus the computer.',
        difficulty: '🟢',
        category: 'Fun & Games'
    },
    {
        label: 'Guess the Number',
        href: '/tools/guess-number-game',
        description: 'Higher/lower hints until you guess the secret number.',
        difficulty: '🟢',
        category: 'Fun & Games'
    },
    {
        label: 'Typing Speed Test',
        href: '/tools/typing-speed-test',
        description: 'Measure WPM and errors with curated prompts.',
        difficulty: '🟡',
        category: 'Fun & Games'
    },
    {
        label: 'Memory Card Game',
        href: '/tools/memory-card-game',
        description: 'Flip cards to find pairs in as few moves as possible.',
        difficulty: '🟠',
        category: 'Fun & Games'
    },
    {
        label: 'Flashcard App',
        href: '/tools/flashcard-app',
        description: 'Create, flip, and store custom flashcards locally.',
        difficulty: '🟡',
        category: 'Study Tools'
    },
    {
        label: 'Arithmetic Practice',
        href: '/tools/arithmetic-practice',
        description: 'Random math drills with score + attempt tracking.',
        difficulty: '🟢',
        category: 'Study Tools'
    },
    {
        label: 'Unit Circle Visualizer',
        href: '/tools/unit-circle-visualizer',
        description: 'See angle, radians, and coordinates on the unit circle.',
        difficulty: '🟠',
        category: 'Study Tools'
    },
    {
        label: 'HTML Tag Cheat Sheet',
        href: '/tools/html-tag-cheatsheet',
        description: 'Searchable reference of common tags and descriptions.',
        difficulty: '🟢',
        category: 'Study Tools'
    },
    {
        label: 'Keyboard Shortcut Cheat Sheet',
        href: '/tools/keyboard-shortcut-cheatsheet',
        description: 'Quick access to popular macOS/Windows/VS Code combos.',
        difficulty: '🟢',
        category: 'Study Tools'
    },
    {
        label: 'Tech Stack Quiz',
        href: '/tools/tech-stack-quiz',
        description: 'Answer three questions to get a stack recommendation.',
        difficulty: '🟢',
        category: 'Portfolio Tools'
    },
    {
        label: 'Project Idea Generator',
        href: '/tools/project-idea-generator',
        description: 'Button-powered inspiration for side projects.',
        difficulty: '🟢',
        category: 'Portfolio Tools'
    },
    {
        label: 'Resume Score Checklist',
        href: '/tools/resume-checklist',
        description: 'Tick resume essentials and watch your completion score.',
        difficulty: '🟢',
        category: 'Portfolio Tools'
    }
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

let activeCategory = 'All';

function renderToolFilters() {
    const container = document.getElementById('toolsFilters');
    if (!container) return;
    container.innerHTML = '';
    CATEGORY_FILTERS.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.category = category;
        button.className = `rounded-full px-4 py-2 transition ${
            activeCategory === category
                ? 'bg-primary text-white shadow'
                : 'bg-transparent text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10'
        }`;
        button.textContent = category;
        button.addEventListener('click', () => {
            activeCategory = category;
            renderToolFilters();
            populateToolsHub();
        });
        container.appendChild(button);
    });
}

let searchQuery = '';

function populateToolsHub() {
    const grid = document.getElementById('toolsHubGrid');
    if (!grid || !Array.isArray(TOOL_LINKS)) return;
    grid.innerHTML = '';

    let visibleTools = activeCategory === 'All'
        ? TOOL_LINKS
        : TOOL_LINKS.filter((tool) => tool.category === activeCategory);

    // Apply search filter if there's a query
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        visibleTools = visibleTools.filter((tool) => {
            const label = tool.label.toLowerCase();
            const description = (tool.description || '').toLowerCase();
            const category = (tool.category || '').toLowerCase();
            return label.includes(query) || description.includes(query) || category.includes(query);
        });
    }

    if (!visibleTools.length) {
        grid.innerHTML = `
            <div class="rounded-3xl border border-dashed border-white/40 bg-white/70 p-8 text-center text-sm text-muted-light dark:border-white/10 dark:bg-background-dark/60 dark:text-muted-dark">
                ${searchQuery.trim() ? 'No tools found matching your search.' : 'No tools in this category yet. Check back soon!'}
            </div>
        `;
        return;
    }

    visibleTools.forEach((tool) => {
        const card = document.createElement('div');
        card.className = 'flex transform-gpu flex-col justify-between rounded-2xl p-6 glassmorphism soft-shadow transition-transform duration-300 hover:-translate-y-1.5 min-h-[200px]';
        card.innerHTML = `
            <div class="flex-1">
                <p class="text-xs uppercase tracking-[0.3em] text-muted-light dark:text-muted-dark">${tool.category || 'Tool'}</p>
                <h3 class="mt-1 text-lg font-semibold text-text-light dark:text-text-dark">${tool.label}</h3>
                <p class="mt-2 text-sm text-muted-light dark:text-muted-dark">${tool.description || ''}</p>
            </div>
            <div class="flex items-center justify-end gap-4 mt-5">
                <a href="${tool.href}" class="open-btn-glow rounded-full bg-primary text-white px-4 py-2 text-sm font-semibold hover:bg-primary/90 whitespace-nowrap" aria-label="Open ${tool.label}">Open</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // Search on input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value;
            populateToolsHub();
        }, 300);
    });

    // Clear search when pressing Escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchQuery = '';
            populateToolsHub();
            searchInput.blur();
        }
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
    renderToolFilters();
    initSearch();
    populateToolsHub();
    const yearSpan = document.getElementById('yearSpan');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});


# Mahin's Portfolio Website

A modern, responsive portfolio website for showcasing IT projects, skills, and educational journey.

## 🌟 Features

- **Modern Glassmorphism Design** - Clean, professional aesthetic with backdrop blur effects
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode** - Toggle between light and dark themes (saved to localStorage)
- **Interactive Navigation** - Mobile-friendly hamburger menu with smooth animations
- **Contact Form** - Functional form with validation (demo mode)
- **SEO Optimized** - Meta tags and descriptions on all pages
- **Fast Loading** - Optimized with modern web technologies

## 📁 Project Structure

```
my prorfolio/
├── index.html          # Homepage with hero section
├── about.html          # About page with skills showcase
├── Studies.html        # Education timeline
├── projects.html       # Project portfolio showcase
├── tools.html          # Free tools page
├── contact.html        # Contact form
├── script.js           # JavaScript for interactivity
├── styles.css          # Shared CSS styles
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - No frameworks, pure JS
- **Google Fonts** - Space Grotesk font family
- **Material Symbols** - Icon library

## 🚀 Getting Started

### Option 1: Direct File Access
Simply open any HTML file in your web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

### Option 2: Local Server (Recommended)
For better performance and to avoid CORS issues:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser to: `http://localhost:8000`

## 📄 Pages Overview

### 1. Home (index.html)
- Hero section with introduction
- Call-to-action buttons
- Responsive image

### 2. About (about.html)
- Profile information
- Skills grid with icons
- Social media links

### 3. Studies (Studies.html)
- Educational timeline
- Degree and certification details
- Key subjects and technologies

### 4. Projects (projects.html)
- Project showcase cards
- Technology tags
- Hover animations

### 5. Tools (tools.html)
- Free utility tools
- PDF and media converters
- Icon-based navigation

### 6. Contact (contact.html)
- Contact form with validation
- Social media links
- Email information

## ✨ Features Explained

### Dark Mode
- Auto-saves preference to localStorage
- Smooth transitions between themes
- Consistent across all pages

### Mobile Menu
- Hamburger icon on mobile devices
- Slide-in animation
- Click outside to close

### Form Validation
- Real-time validation
- User-friendly error messages
- Demo mode (ready for backend integration)

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- Flexible grid layouts

## 🎨 Customization

### Colors
Edit the Tailwind config in each HTML file or `styles.css`:
```javascript
colors: {
  "primary": "#2b6cee",        // Main accent color
  "background-light": "#f6f6f8", // Light mode background
  "background-dark": "#101622",  // Dark mode background
}
```

### Fonts
Change the Google Fonts import in the HTML `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300..700&display=swap" rel="stylesheet"/>
```

### Content
- Replace placeholder text in HTML files
- Update email address in `contact.html`
- Add your social media links
- Replace project descriptions
- Update educational information

## 🔧 Backend Integration

### Contact Form
To connect the contact form to a backend:

1. Uncomment the `fetch` code in `script.js` (lines ~134-150)
2. Replace `YOUR_BACKEND_ENDPOINT` with your API endpoint
3. Configure CORS on your backend
4. Handle the POST request with form data

Example backend endpoints:
- **Formspree**: `https://formspree.io/f/YOUR_ID`
- **EmailJS**: Use EmailJS SDK
- **Custom API**: Your own server endpoint

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 To-Do / Future Enhancements

- [ ] Add actual CV/Resume PDF file
- [ ] Replace placeholder images with real photos
- [ ] Add more project details and case studies
- [ ] Implement backend for contact form
- [ ] Add blog section
- [ ] Add animations on scroll (AOS library)
- [ ] Create 404 page
- [ ] Add loading animations
- [ ] Implement analytics (Google Analytics)
- [ ] Add more interactive elements

## 🐛 Known Issues

- Tool links on `tools.html` currently use `#` placeholders
- CV download button needs actual PDF file
- Form submits in demo mode only
- Some external image URLs should be replaced with local files

## 📄 License

This project is free to use for personal and educational purposes.

## 👤 Author

**Mahin Kadery**
- Portfolio: https://toolfoliohub.com
- Email: contact@toolfoliohub.com
- GitHub: https://github.com/mahinkadery
- LinkedIn: https://www.linkedin.com/in/mahin-kadery

## 🙏 Acknowledgments

- Tailwind CSS for the utility-first framework
- Google Fonts for the Space Grotesk font
- Material Symbols for the icon library

---

**Note**: Remember to replace all placeholder content (email, social links, images, etc.) with your actual information before deploying!


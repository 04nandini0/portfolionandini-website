# Software Engineer Portfolio Template

A clean, modern, fully responsive personal portfolio website built with **HTML5, CSS3, and Vanilla JavaScript (ES6+)** — no frameworks, no build tools. Just open `index.html` and it works.

This is designed as a **reusable template**. All personal content lives in clearly marked, easy-to-find places so you can customize it without digging through hundreds of lines of code.

---

## 📁 Project Structure

```
project/
│
├── index.html          # All page content & structure
├── css/
│   └── style.css       # All styling (theme controlled via CSS variables)
├── js/
│   └── script.js        # Interactivity (menu, theme, filters, form, etc.)
├── assets/
│   ├── images/          # Profile photo + project screenshots
│   ├── icons/           # Favicon
│   └── resume/
│       └── CV.pdf        # Your resume (replace this file)
└── README.md
```

---

## 🚀 Getting Started

1. Download / clone this project folder.
2. Open `index.html` directly in your browser — no server or build step required.
3. Start customizing using the guide below.

---

## ✏️ How to Customize

### 1. Personal Information

Search the project for comments starting with `<!-- TODO:`, `/* TODO:`, or `// TODO:` — every place that needs your information is marked this way.

Key places in `index.html`:

- **Name & title** — Hero section (`<h1 class="hero__title">`, `<h2 class="hero__role">`)
- **Tagline / subtitle** — Hero `<p class="hero__subtitle">`
- **About section** — your background, education, and goals
- **Education timeline** — inside `.timeline` in the About section
- **Skill levels** — adjust the `--value` percentages in the Skills section
- **Journey / Experience timeline** — inside `.journey` in the Experience section

In `js/script.js`, there's a `portfolioData` object near the top of the file under:

```js
// =============================
// PERSONAL CONFIGURATION
// =============================
const portfolioData = {
  name: "Your Name",
  role: "Software Engineer",
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  resumePath: "assets/resume/CV.pdf",
};
```

This object documents your core info in one place — feel free to reference it as your single source of truth and extend the script to inject these values into the page if you'd like.

---

### 2. Profile Image

- Add your professional photo to `assets/images/profile.png` (square image recommended, e.g. 600×600px).
- The hero section already points to this file — just replace it (keep the same filename, or update the `src` in `index.html`).

---

### 3. Resume / CV

- Replace `assets/resume/CV.pdf` with your actual resume (same filename), **or**
- Use a different filename and update the `href` in both:
  - The hero **"Download CV"** button
  - The **Resume section** ("View CV" and "Download CV" buttons)

Both buttons are already wired with the `download` attribute where appropriate.

---

### 4. Projects

Each project card in the **Projects** section (`#projects`) is marked with a comment block:

```html
<!-- TODO:
Replace project name,
description,
GitHub link,
and live demo link
-->
```

For each project, update:

- Project screenshot → `assets/images/project-*.png`
- Project title & description
- Technology tags
- GitHub repository URL
- Live demo URL

**Project filtering** uses the `data-category` attribute on each `.project-card`. Categories used: `web-apps`, `ui-projects`, `js-projects`. Add/remove categories as needed — just keep the filter buttons (`data-filter`) and card categories in sync.

To add a new project, copy an existing `<article class="project-card">` block and edit its content.

---

### 5. Social Links & Contact Info

Update these throughout `index.html` (Hero, Contact section, Footer):

- GitHub URL
- LinkedIn URL
- Email address
- Location (in the Contact section)

All instances are marked with `<!-- TODO: -->` comments.

---

### 6. Colors & Theme

All colors are defined as CSS variables at the top of `css/style.css`:

```css
:root {
  --color-bg: #0B0F19;
  --color-surface: #111827;
  --color-primary: #6366F1;
  --color-accent: #22D3EE;
  --color-text: #F8FAFC;
  --color-text-muted: #94A3B8;
}
```

Change these values to adjust the entire site's color scheme. A light theme is already included and toggled via the theme button in the navbar (saved in `localStorage`).

---

### 7. Contact Form

The contact form includes client-side validation (name, email format, message length) but does **not** send data anywhere by default — there's no backend included.

To make it functional, connect it to a service such as:

- [Formspree](https://formspree.io/)
- [EmailJS](https://www.emailjs.com/)
- Netlify Forms
- Your own backend/API endpoint

Look for the `TODO` comment inside the `submit` handler in `js/script.js`.

---

## 🌐 Deployment

This is a static site, so you can deploy it anywhere that serves static files:

- **GitHub Pages** — push this folder to a repo and enable Pages in repo settings.
- **Netlify** — drag and drop the project folder into Netlify's dashboard, or connect your repo.
- **Vercel** — import the repo and deploy (no build command needed).
- **Any static host** — Cloudflare Pages, Firebase Hosting, traditional web hosting, etc.

No build step is required — just upload the contents of the `project/` folder as-is.

---

## ✅ Features Included

- Sticky navbar with smooth scrolling & active section highlighting
- Mobile hamburger menu
- Light/dark theme toggle (persisted via `localStorage`)
- Hero section with floating tech icons & typing code animation
- Scroll-triggered fade-up animations (via Intersection Observer)
- Animated skill progress bars
- Project filtering by category
- Contact form with JavaScript validation
- Back-to-top button
- Fully responsive (desktop, tablet, mobile)
- Semantic HTML & SEO meta tags
- Respects `prefers-reduced-motion`

---

## 📄 License

This template is free to use and modify for your personal portfolio.

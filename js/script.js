const portfolioData = {
  name: "Your Name",
  role: "Software Engineer",
  email: "your.email@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  resumePath: "assets/resume/CV.pdf",
};

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  initNavbar();
  initThemeToggle();
  initScrollSpy();
  initScrollAnimations();
  initSkillBars();
  initProjectFilters();
  initContactForm();
  initBackToTop();
  initTypingEffect();
});

/* =============================
   FOOTER YEAR
============================== */
function setCurrentYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* =============================
   NAVBAR: scroll style + mobile menu
============================== */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navbar-toggle");
  const nav = document.getElementById("navbar-nav");

  // Add background/blur once user scrolls down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile hamburger menu toggle
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("active");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close mobile menu when a link is clicked
  nav.querySelectorAll(".navbar__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* =============================
   THEME TOGGLE (Light / Dark)
============================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const root = document.documentElement;

  // Load saved theme preference, if any
  const savedTheme = localStorageGet("portfolio-theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
  }

  toggleBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";

    if (next === "dark") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", "light");
    }

    localStorageSet("portfolio-theme", next);
  });
}

// Small wrappers so the site doesn't break if localStorage is unavailable
function localStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function localStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    /* ignore */
  }
}

/* =============================
   SCROLL SPY: highlight active nav link
============================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("main section[id], section#home");
  const navLinks = document.querySelectorAll(".navbar__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-45% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/* =============================
   SCROLL ANIMATIONS (fade-up)
============================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* =============================
   SKILL BARS: animate fill on view
============================== */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill__fill");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* =============================
   PROJECT FILTERING
============================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyMessage = document.getElementById("projects-empty");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.getAttribute("data-filter");

      // Update active button state
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");

      // Show/hide project cards based on category
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");
        const isVisible = filterValue === "all" || categories.includes(filterValue);

        card.classList.toggle("hidden", !isVisible);
        if (isVisible) visibleCount++;
      });

      // Show empty state message if nothing matches
      if (emptyMessage) {
        emptyMessage.hidden = visibleCount !== 0;
      }
    });
  });
}

/* =============================
   CONTACT FORM VALIDATION
============================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");

    let isValid = true;

    isValid = validateField(nameInput, (value) => value.trim().length >= 2, "Please enter your name (at least 2 characters).") && isValid;

    isValid = validateField(
      emailInput,
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
      "Please enter a valid email address."
    ) && isValid;

    isValid = validateField(messageInput, (value) => value.trim().length >= 10, "Your message should be at least 10 characters long.") && isValid;

    if (!isValid) {
      status.textContent = "Please fix the errors above and try again.";
      status.style.color = "#F87171";
      return;
    }

    // TODO: Connect this form to your own backend, form service, or email API
    // (e.g. Formspree, EmailJS, Netlify Forms, or a custom serverless function)
    status.style.color = "";
    status.textContent = "Thanks! Your message has been noted. (Connect this form to a backend to receive messages.)";

    form.reset();
  });

  // Clear errors as the user types
  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      const group = field.closest(".form-group");
      const errorEl = form.querySelector(`[data-error-for="${field.id}"]`);
      group.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    });
  });
}

function validateField(field, validatorFn, errorMessage) {
  const group = field.closest(".form-group");
  const errorEl = group.querySelector(".form-error");
  const value = field.value || "";

  if (!validatorFn(value)) {
    group.classList.add("error");
    if (errorEl) errorEl.textContent = errorMessage;
    return false;
  }

  group.classList.remove("error");
  if (errorEl) errorEl.textContent = "";
  return true;
}

/* =============================
   BACK TO TOP BUTTON
============================== */
function initBackToTop() {
  const button = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 400);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* =============================
   HERO CODE-CARD TYPING ANIMATION
============================== */
function initTypingEffect() {
  const target = document.getElementById("typing-code");
  if (!target) return;

  // TODO: Customize this snippet to reflect your own focus or favorite language
  const snippet = `function buildSoftware() {
  const skills = [
    "problem-solving",
    "clean code",
    "scalability"
  ];

  return skills.map(grow);
}`;

  let index = 0;
  const speed = 35; // milliseconds per character

  function typeNextChar() {
    if (index <= snippet.length) {
      target.textContent = snippet.slice(0, index);
      index++;
      setTimeout(typeNextChar, speed);
    } else {
      // Pause, then restart the loop for a subtle ambient effect
      setTimeout(() => {
        index = 0;
        typeNextChar();
      }, 4000);
    }
  }

  // Respect users who prefer reduced motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    target.textContent = snippet;
  } else {
    typeNextChar();
  }
}

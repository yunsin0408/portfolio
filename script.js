/* =========================================================
   Portfolio – script.js
   ========================================================= */

(function () {
  "use strict";

  // ── Navbar scroll effect ──────────────────────────────
  const navbar = document.getElementById("navbar");

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    highlightNavLink();
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // ── Mobile menu ───────────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // ── Active nav link highlighting ──────────────────────
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = navLinks.querySelectorAll("a");

  function highlightNavLink() {
    let current = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 90;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach(function (anchor) {
      anchor.classList.remove("active");
      if (anchor.getAttribute("href") === "#" + current) {
        anchor.classList.add("active");
      }
    });
  }

  // ── Scroll-in animations ──────────────────────────────
  const animatedEls = document.querySelectorAll(
    ".skill-category, .project-card, .stat-card, .contact-item, .contact-form"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    animatedEls.forEach(function (el) {
      el.classList.add("fade-up");
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    animatedEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ── Contact form ──────────────────────────────────────
  const form = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic client-side validation
    if (!name || !email || !message) {
      setStatus("Please fill in all fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setStatus("Please enter a valid email address.", "error");
      return;
    }

    /*
     * UPDATE: Replace this placeholder with your preferred contact
     * solution (e.g. Formspree, EmailJS, Netlify Forms, a backend
     * endpoint, etc.).
     *
     * Example with Formspree:
     *   form.action = "https://formspree.io/f/YOUR_FORM_ID";
     *   form.method = "POST";
     *   form.submit();
     */

    // Simulate a successful submission (remove once real endpoint added)
    setStatus("✅ Message sent! I'll get back to you soon.", "success");
    form.reset();
  });

  function setStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = "form-note " + type;
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // ── Resume button ──────────────────────────────────────
  // UPDATE: Replace "#" with a real path or URL to your resume PDF.
  // e.g. document.getElementById("resume-btn").href = "resume.pdf";

})();

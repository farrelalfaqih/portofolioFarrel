/**
 * ============================================================================
 * Portfolio UI Script
 * - Smooth scroll navigation (with header offset)
 * - Active nav highlight based on current section
 * - Reveal animations (general + projects cards)
 * ============================================================================
 */

(() => {
  /* ================= CONFIG ================= */

  const HEADER_OFFSET_PX = 80;

  const NAV_ACTIVE_CLASSES = [
    "bg-primary",
    "text-white",
    "font-semibold",
    "border",
    "border-primary",
  ];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ================= DOM REFERENCES ================= */

  const navLinks = document.querySelectorAll("nav .nav-link");
  if (!navLinks.length) return;

  const sectionsById = {};
  navLinks.forEach((link) => {
    const sectionId = link.getAttribute("data-section");
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) sectionsById[sectionId] = sectionEl;
  });

  /* ================= HELPERS ================= */

  function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const linkSectionId = link.getAttribute("data-section");

      // Reset state
      NAV_ACTIVE_CLASSES.forEach((c) => link.classList.remove(c));
      link.classList.remove("text-white");
      link.classList.add("text-black");

      // Apply active state
      if (linkSectionId === sectionId) {
        NAV_ACTIVE_CLASSES.forEach((c) => link.classList.add(c));
        link.classList.remove("text-black");
      }
    });
  }

  function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
    window.scrollTo({ top, behavior: "smooth" });
  }

  /* ================= NAV CLICK EVENTS ================= */

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("data-section");
      scrollToSection(sectionId);
    });
  });

  /* ================= SECTION OBSERVER (ACTIVE NAV) ================= */

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
  );

  Object.values(sectionsById).forEach((section) => sectionObserver.observe(section));
  setActiveNav("home");

  /* ================= REVEAL ANIMATIONS ================= */

  const revealElements = document.querySelectorAll(".reveal");
  const projectCards = document.querySelectorAll(".card-animate");

  // If reduced motion is enabled, show everything immediately
  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    projectCards.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // General reveal (fade + slide)
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target); // animate once (performance)
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Projects cards reveal (supports stagger via transition-delay)
  if (projectCards.length) {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          cardObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    projectCards.forEach((el) => cardObserver.observe(el));
  }
})();

(() => {
  const activeClasses = ["bg-primary", "text-white", "font-semibold", "border", "border-primary"];
  const navLinks = document.querySelectorAll("nav .nav-link");
  if (!navLinks.length) return;

  const sections = {};
  navLinks.forEach((link) => {
    const sectionId = link.getAttribute("data-section");
    const sectionEl = document.getElementById(sectionId);
    if (sectionEl) sections[sectionId] = sectionEl;

    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(sectionId);
      if (!target) return;

      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const linkSection = link.getAttribute("data-section");

      activeClasses.forEach((c) => link.classList.remove(c));
      link.classList.remove("text-white");
      link.classList.add("text-black");

      if (linkSection === sectionId) {
        activeClasses.forEach((c) => link.classList.add(c));
        link.classList.remove("text-black");
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveNav(entry.target.id)),
    { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
  );

  Object.values(sections).forEach((sec) => observer.observe(sec));
  setActiveNav("home");
})();


document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggleLogo = document.getElementById("theme-toggle-logo"); // navbar logo

  // --- Navbar logo swap ---
  function updateNavbarLogo() {
    if (!themeToggleLogo) return;
    const isDark = body.classList.contains("dark-theme");
    themeToggleLogo.src = isDark
      ? "images/logo-white.svg"
      : "images/logo-black.svg";
  }

  // --- Initialize theme ---
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  } else {
    body.classList.remove("dark-theme");
  }
  updateNavbarLogo();

  // --- Theme toggle click ---
  if (themeToggleLogo) {
    themeToggleLogo.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDark = body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateNavbarLogo();
    });
  }

  // --- MOBILE MENU LOGIC ---
  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      menuBtn.classList.toggle("open");
    });
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuBtn.classList.remove("open");
      });
    });
    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove("active");
        menuBtn.classList.remove("open");
      }
    });
  }

  // --- SCROLL TO TOP LOGIC ---
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // --- EMAIL VALIDATION ---
  window.checkEmail = function () {
    const emailInput = document.getElementById("footerEmail");
    if (!emailInput) return;
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      alert("Please enter an email address.");
      emailInput.focus();
    } else if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address.");
      emailInput.focus();
    } else {
      alert("Thanks for subscribing! Check your inbox.");
      emailInput.value = "";
    }
  };
});

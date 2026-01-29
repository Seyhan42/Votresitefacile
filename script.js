// VSF core interactions
const header = document.querySelector(".site-header");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navBackdrop = document.querySelector("[data-nav-backdrop]");

const setHeaderState = () => {
  if (!header) return;
  const isScrolled = window.scrollY > 12;
  header.classList.toggle("is-scrolled", isScrolled);
};

const closeNav = () => {
  document.body.classList.remove("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");
  }
};

const toggleNav = () => {
  const isOpen = document.body.classList.toggle("nav-open");
  if (navToggle) {
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }
};

if (navToggle && nav) {
  navToggle.addEventListener("click", toggleNav);
  navBackdrop?.addEventListener("click", closeNav);
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 980) {
        closeNav();
      }
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observe) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observe.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("in-view"));
}

// Dynamic year in footer
const yearTarget = document.querySelector("[data-year]");
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}


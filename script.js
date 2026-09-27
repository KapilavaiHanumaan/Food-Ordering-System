/* ============================================================
   Hanumaan Kapilavai — Portfolio interactions
   ============================================================ */

// ---------- Typewriter effect ----------
const roles = [
  "Data Analyst",
  "Java Developer",
  "Machine Learning Enthusiast",
  "Power BI Dashboard Builder",
  "Problem Solver",
];

const twEl = document.getElementById("typewriter");
let roleIdx = 0, charIdx = 0, deleting = false;

function typewriter() {
  const current = roles[roleIdx];
  twEl.textContent = current.slice(0, charIdx);

  if (!deleting && charIdx < current.length) {
    charIdx++;
    setTimeout(typewriter, 65);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typewriter, 1600); // pause at full word
  } else if (charIdx > 0) {
    charIdx--;
    setTimeout(typewriter, 35);
  } else {
    deleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    setTimeout(typewriter, 350);
  }
}
typewriter();

// ---------- Navbar: scroll style + active link ----------
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  document.querySelector(".nav-links").classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    document.querySelector(".nav-links").classList.remove("open");
  })
);

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);

  let currentId = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Animated counters (About facts) ----------
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isDecimal = !Number.isInteger(target);
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = target * eased;
        el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// ---------- Hero entrance stagger ----------
window.addEventListener("load", () => {
  const heroEls = document.querySelectorAll(".hero-text > *");
  heroEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  });
});

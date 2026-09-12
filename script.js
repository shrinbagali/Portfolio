// ============================================================
// SHRIN S BAGALI — PORTFOLIO SCRIPT
// ============================================================

// Mark that JS is running so CSS can enable scroll-reveal animation.
// If this line never executes (JS blocked/erroring), the page stays
// fully visible by default — see the .reveal rules in style.css.
document.documentElement.classList.add("js-anim");

// ---------- CONFIG ----------
const profile = {
  github: "",   // add GitHub profile URL here
  linkedin: "", // add LinkedIn profile URL here
  resume: "assets/resume.pdf"
};

// ---------- PROJECT DATA ----------
const projects = [
  {
    title: "Hunar Bazar",
    category: "ai",
    tags: ["AI / ML", "Web"],
    featured: true,
    description: "An AI-assisted digital marketplace concept designed to help marginalized artisans showcase, catalog and sell their products while simplifying product listing and discovery.",
    features: [
      "Buyer and artisan roles",
      "AI-assisted product cataloging",
      "AI-generated descriptions",
      "AI price prediction",
      "Multilingual experience with voice-to-text"
    ],
    tech: ["HTML", "CSS", "JavaScript", "AI", "Firebase"]
  },
  {
    title: "HEALIX",
    subtitle: "Feel it, Fix it, Flow again",
    category: "ai",
    tags: ["AI / ML"],
    featured: true,
    description: "A Gen Z-focused mental wellness companion concept designed around conversation, reflection and interactive emotional support experiences.",
    features: [
      "AI conversational companion",
      "Emotion and sentiment exploration",
      "Journaling and voice interaction",
      "Grounding activities and progress tracking"
    ],
    tech: ["AI", "JavaScript", "Firebase"]
  },
  {
    title: "Health Risk Predictor",
    category: "ai",
    tags: ["AI / ML"],
    featured: true,
    description: "A machine-learning application that uses inputs such as glucose, BMI, blood pressure and age to estimate health-risk categories and provide supporting insights.",
    features: [
      "Random Forest risk classification",
      "Interactive input with visual results",
      "Chatbot interface for suggestions"
    ],
    tech: ["Python", "Machine Learning", "Random Forest", "Streamlit"]
  },
  {
    title: "Rescue Synth AI",
    category: "ai",
    tags: ["AI / ML"],
    description: "An AI-oriented disaster simulation and synthetic-data project exploring earthquake and cyclone scenarios using historical and simulated information.",
    features: [
      "Disaster scenario simulation",
      "Synthetic data generation",
      "Simulation dashboard with visualization"
    ],
    tech: ["Python", "AI/ML", "Data Processing"]
  },
  {
    title: "Vista Hub",
    category: "java",
    tags: ["Java", "Management"],
    description: "A Java-based hostel management system designed to organize rooms, students, complaints, mess services, laundry and emergency handling.",
    features: [
      "AC / Non-AC / Shared room allocation",
      "Complaint and mess management",
      "Emergency priority handling"
    ],
    tech: ["Java OOP", "2D Arrays", "HashMap", "LinkedList", "PriorityQueue"]
  },
  {
    title: "Petrol Pump Management System",
    category: "java",
    tags: ["Java", "Management"],
    description: "A management-oriented software project designed to organize common petrol pump operations and streamline routine management tasks.",
    features: [
      "Operations tracking",
      "Structured record management"
    ],
    tech: ["Java", "OOP", "Database Concepts"]
  }
];

// ---------- ACHIEVEMENTS DATA ----------
const achievements = [
  "Secretary — IEEE Student Branch, BLDEA CET",
  "2nd Runner-Up — Smart India Hackathon (Ideathon) 2025",
  "2nd Position — Innorise Hackathon 2025",
  "Participant — Wave 3.0 National Level Hackathon",
  "Active Participant — AI Arena and Samshodhana Skillathon",
  "Contributor — Traffic Week Awareness Initiative",
  "Student Coordinator — Food Walk Event",
  "Participant — Vrukshathon Heritage Run 2025 (5K)",
  "Event Anchor — Rangmanch 2K25",
  "Event Anchor — \"Future of AI\"",
  "Participant — Invictus 2025"
];

// ---------- HACKATHON JOURNEY DATA ----------
const hackathons = [
  { name: "Smart India Hackathon (Ideathon) 2025", result: "2nd Runner-Up" },
  { name: "Innorise Hackathon 2025", result: "2nd Position" },
  { name: "Wave 3.0", result: "National Level Participant" },
  { name: "AI Arena", result: "Participant" },
  { name: "Samshodhana Skillathon", result: "Participant" }
];

// Small helper so a bug in one feature can't take the whole page down.
function safe(label, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[portfolio] ${label} failed:`, err);
  }
}

// ---------- REVEAL ON SCROLL (defined first so other sections can call it) ----------
let revealObserver;
function observeReveals() {
  const targets = document.querySelectorAll(".reveal:not(.in-view)");
  if (!("IntersectionObserver" in window)) {
    // No observer support — just show everything immediately.
    targets.forEach(t => t.classList.add("in-view"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
  }
  targets.forEach(t => revealObserver.observe(t));
}

// ---------- RENDER PROJECTS ----------
const projectsGrid = document.getElementById("projects-grid");

function renderProjects(filter = "all") {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = "";
  const filtered = projects.filter(p => filter === "all" || p.category === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement("article");
    card.className = "project-card reveal" + (p.featured ? " featured" : "");

    const featuresHTML = p.features.map(f => `<li>${f}</li>`).join("");
    const techHTML = p.tech.map(t => `<span class="tech-chip">${t}</span>`).join("");
    const tagsHTML = p.tags.map(t => `<span class="project-category">${t}</span>`).join(" ");

    card.innerHTML = `
      <span class="project-number">${String(i + 1).padStart(2, "0")}</span>
      <h3 class="project-title">${p.title}</h3>
      ${p.subtitle ? `<p class="project-subtitle">${p.subtitle}</p>` : ""}
      <div>${tagsHTML}</div>
      <p class="project-desc">${p.description}</p>
      <ul class="project-features">${featuresHTML}</ul>
      <div class="tech-row">${techHTML}</div>
    `;
    projectsGrid.appendChild(card);
  });

  observeReveals();
}

safe("initial project render", () => renderProjects());

// ---------- PROJECT FILTERING ----------
safe("project filters", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderProjects(btn.dataset.filter);
    });
  });
});

// ---------- RENDER ACHIEVEMENTS ----------
safe("achievements render", () => {
  const achievementsList = document.getElementById("achievements-list");
  if (!achievementsList) return;
  achievements.forEach(text => {
    const item = document.createElement("div");
    item.className = "timeline-item reveal";
    const [title, ...rest] = text.split(" — ");
    item.innerHTML = `<h3>${title}</h3>${rest.length ? `<p>${rest.join(" — ")}</p>` : ""}`;
    achievementsList.appendChild(item);
  });
});

// ---------- RENDER HACKATHON JOURNEY ----------
safe("hackathon journey render", () => {
  const hackathonList = document.getElementById("hackathon-list");
  if (!hackathonList) return;
  hackathons.forEach(h => {
    const card = document.createElement("div");
    card.className = "hackathon-card reveal";
    card.innerHTML = `<span class="hackathon-name">${h.name}</span><span class="hackathon-result">${h.result}</span>`;
    hackathonList.appendChild(card);
  });
});

// ---------- MOBILE MENU ----------
safe("mobile menu", () => {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "Close menu");
    mobileMenu.classList.add("open");
  }
  function closeMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
  }
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
      hamburger.focus();
    }
  });

  document.addEventListener("click", e => {
    const clickedInsideMenu = mobileMenu.contains(e.target) || hamburger.contains(e.target);
    if (!clickedInsideMenu && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });
});

// ---------- NAVBAR SCROLL EFFECT ----------
safe("navbar scroll effect", () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  function handleNavbarScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();
});

// ---------- ACTIVE NAV LINK ----------
safe("active nav link", () => {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  if (!sections.length || !navLinks.length) return;

  function setActiveLink() {
    let current = "";
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();
});

// ---------- BACK TO TOP ----------
safe("back to top", () => {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) return;
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Reveal everything already on the page (not just projects) now that
// the DOM is fully built.
safe("initial reveal pass", () => observeReveals());

// Ultimate safety net: whatever happens above, make sure nothing is
// left invisible for good. If a reveal element somehow never gets
// caught by the observer (e.g. zero-height container, edge-case
// browser bug), force it visible after a short delay.
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in-view)").forEach(el => {
      el.classList.add("in-view");
    });
  }, 2000);
});

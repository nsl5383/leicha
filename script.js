(() => {
  const body = document.body;
  const langButtons = document.querySelectorAll(".lang-btn");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobile-nav");
  const yearEl = document.querySelector("#year");

  const WA_EN =
    "https://wa.me/60123753302?text=Hi%20valerie%2C%20I%20would%20like%20to%20order%20the%20following%3A%20%0A1.%20Leicha%20rice%20bowl%20x%20(RM11)%0A2.%20Leicha%20vege%20bowl%20x%20(RM12)%0A3.%20Leicha%20paste%20tub%20peanuts%20x%20(RM29)%0A4.%20Leicha%20paste%20tub%20cashew%20nut%20x%20(RM31)%0A5.%20Leicha%20paste%20individual%20pack%20(6%20units)%20peanuts%20x%20(RM39)%0A6.%20Leicha%20paste%20individual%20pack%20(6%20units)%20cashew%20nut%20x%20(RM41)%0A%0ADelivery%20on%3A%20";
  const WA_ZH =
    "https://wa.me/60123753302?text=Hi%20Valerie%EF%BC%8C%E6%88%91%E6%83%B3%E9%A2%84%E8%AE%A2%E4%BB%A5%E4%B8%8B%E4%BA%A7%E5%93%81%EF%BC%9A%0A1.%20%E6%93%82%E8%8C%B6%E9%A5%AD%E4%BE%BF%E5%BD%93%20x%EF%BC%88RM11%EF%BC%89%0A2.%20%E6%93%82%E8%8C%B6%E8%8F%9C%E4%BE%BF%E5%BD%93%20x%EF%BC%88RM12%EF%BC%89%0A3.%20%E8%8A%B1%E7%94%9F%E6%93%82%E8%8C%B6%E9%85%B1%20tub%20x%EF%BC%88RM29%EF%BC%89%0A4.%20%E8%85%B0%E8%B1%86%E6%93%82%E8%8C%B6%E9%85%B1%20tub%20x%EF%BC%88RM31%EF%BC%89%0A5.%20%E8%8A%B1%E7%94%9F%E6%93%82%E8%8C%B6%E9%85%B1%E5%8D%95%E5%8C%85%E8%A3%85%EF%BC%886%20%E5%8C%85%EF%BC%89%20x%EF%BC%88RM39%EF%BC%89%0A6.%20%E8%85%B0%E8%B1%86%E6%93%82%E8%8C%B6%E9%85%B1%E5%8D%95%E5%8C%85%E8%A3%85%EF%BC%886%20%E5%8C%85%EF%BC%89%20x%EF%BC%88RM41%EF%BC%89%0A%0A%E9%85%8D%E9%80%81%E6%97%A5%E6%9C%9F%EF%BC%9A";

  function applyLanguage(lang) {
    const isZh = lang === "zh";
    body.classList.toggle("lang-zh", isZh);
    body.lang = isZh ? "zh-Hans" : "en";

    document.querySelectorAll("[data-en][data-zh]").forEach((el) => {
      const text = isZh ? el.getAttribute("data-zh") : el.getAttribute("data-en");
      if (text != null) el.textContent = text;
    });

    // Order WhatsApp links follow UI language; office group order stays fixed
    document.querySelectorAll('a[href*="wa.me/60123753302"]').forEach((a) => {
      if (a.hasAttribute("data-wa-fixed")) return;
      a.setAttribute("href", isZh ? WA_ZH : WA_EN);
    });

    langButtons.forEach((btn) => {
      const active = btn.dataset.lang === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    try {
      localStorage.setItem("songsdeli-lang", lang);
    } catch (_) {
      /* ignore */
    }
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  // Restore preference or browser language
  let initial = "en";
  try {
    const saved = localStorage.getItem("songsdeli-lang");
    if (saved === "en" || saved === "zh") initial = saved;
    else if (navigator.language && navigator.language.toLowerCase().startsWith("zh")) initial = "zh";
  } catch (_) {
    if (navigator.language && navigator.language.toLowerCase().startsWith("zh")) initial = "zh";
  }
  applyLanguage(initial);

  // Mobile nav
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", open ? "false" : "true");
      mobileNav.hidden = open;
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      });
    });
  }

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Gentle reveal on scroll
  const revealEls = document.querySelectorAll(
    ".step, .product-card, .quote-card, .meta-card, .story-panel, .office-banner"
  );
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }
})();

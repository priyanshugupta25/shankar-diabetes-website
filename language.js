// language.js — handles language switching for Shankar Diabetes Care Centre

(function () {
  // Default language is Hindi
  const DEFAULT_LANG = "hi";

  function getCurrentLang() {
    return localStorage.getItem("sdcc_lang") || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem("sdcc_lang", lang);
    applyTranslations(lang);
    updateLangButton(lang);
    updateDropdownActive(lang);
  }
  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    // Text translations
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");

      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Placeholder translations
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");

      if (t[key] !== undefined) {
        el.placeholder = t[key];
      }
    });

    // ===== Banner Image Change =====
    const bannerImg = document.getElementById("about-banner-img");

    if (bannerImg) {
      if (lang === "hi") {
        bannerImg.src = "assets/img/Banner-07-hi.png";
      } else {
        bannerImg.src = "assets/img/Banner-07-en.png";
      }
    }

    // Update html lang attribute
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }

  function updateLangButton(lang) {
    const btn = document.querySelector(".language-btn .lang-label");
    if (btn) {
      btn.textContent = lang === "hi" ? "हिंदी" : "English";
    }
  }

  function updateDropdownActive(lang) {
    document
      .querySelectorAll(".lang-dropdown .lang-option")
      .forEach(function (opt) {
        opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
      });
  }

  // Init dropdown toggle
  function initDropdown() {
    const btn = document.querySelector(".language-btn");
    const dropdown = document.querySelector(".lang-dropdown");
    if (!btn || !dropdown) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", function () {
      dropdown.classList.remove("open");
    });

    dropdown.querySelectorAll(".lang-option").forEach(function (opt) {
      opt.addEventListener("click", function (e) {
        e.stopPropagation();
        const lang = this.getAttribute("data-lang");
        setLang(lang);
        dropdown.classList.remove("open");
      });
    });
    document.querySelectorAll(".lang-option-mobile").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setLang(this.getAttribute("data-lang"));
      });
    });
  }

  // Run on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    initDropdown();
    const lang = getCurrentLang();
    applyTranslations(lang);
    updateLangButton(lang);
    updateDropdownActive(lang);
  });
})();

/* CMS image overrides and safe fallbacks. No DOM nodes are removed or reordered. */
(() => {
  const defaults = {
    fallbackInterior: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&auto=format&q=82",
    fallbackPainter: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=900&fit=crop&auto=format&q=82",
  };
  const imageKeysByAlt = {
    "دهانات تحمي جدارك وتعكس ذوقك": "hero1",
    "من المصنع إلى الجدار بجودة مضمونة": "hero2",
    "دهانات خارجية": "categoryExt",
    "دهانات داخلية": "categoryInt",
    "دهانات ديكورية": "categoryDec",
    "معجون ومعالجات": "categoryPutty",
    "مواد عزل": "categoryInsulation",
    "كيف تختار لون الدهان المناسب لغرفة المعيشة": "article1",
    "الفرق بين الدهان المائي والزيتي": "article2",
    "خطوات تجهيز الحائط قبل الدهان": "article3",
    "كتالوج الدهانات الخارجية 2026": "catalog1",
    "كتالوج الألوان الديكورية": "catalog2",
    "دهانات خارجية - موديل 1": "product1",
    "دهانات داخلية - موديل 2": "product2",
    "دهانات ديكورية - موديل 3": "product3",
    "معجون ومعالجات - موديل 4": "product4",
    "مواد عزل - موديل 5": "product5",
    "دهانات خارجية - موديل 6": "product6",
    "دهانات داخلية - موديل 7": "product7",
    "دهانات ديكورية - موديل 8": "product8",
  };
  const settings = () => window.__ELAMAL_SETTINGS || {};
  const siteImages = () => settings().siteImages || {};
  const isProtected = (img) =>
    img.closest('a[href^="/projects"]') || location.pathname.startsWith("/gallery");

  const applyImage = (img) => {
    if (!(img instanceof HTMLImageElement) || isProtected(img)) return;
    const key = imageKeysByAlt[(img.alt || "").trim()];
    const override = key && siteImages()[key];
    if (
      override &&
      img.dataset.elamalOverrideFailed !== override &&
      img.getAttribute("src") !== override
    ) {
      img.srcset = "";
      img.src = override;
    }
    if (img.dataset.elamalErrorReady) return;
    img.dataset.elamalErrorReady = "true";
    img.addEventListener("error", () => {
      if (img.dataset.elamalFallback === "true") return;
      if (key && img.getAttribute("src") === siteImages()[key]) {
        img.dataset.elamalOverrideFailed = siteImages()[key];
      }
      const text = `${img.alt || ""} ${img.closest("a")?.getAttribute("href") || ""}`;
      const fallbackKey = /مقال|article|تجهيز|دهان/.test(text)
        ? "fallbackPainter"
        : "fallbackInterior";
      img.dataset.elamalFallback = "true";
      img.srcset = "";
      img.src = siteImages()[fallbackKey] || defaults[fallbackKey];
      img.alt = img.alt || "دهانات الأمل";
    });
  };

  const scan = (root = document) => root.querySelectorAll?.("img").forEach(applyImage);
  scan();
  window.addEventListener("elamal:settings", () => scan());
  new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "attributes") applyImage(change.target);
      for (const node of change.addedNodes || []) if (node.nodeType === 1) scan(node);
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src"],
  });
})();

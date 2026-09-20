/* Safe image fallbacks. CMS-controlled projects and gallery are never changed here. */
(() => {
  const photos = {
    interior: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&auto=format&q=82",
    painter: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=900&fit=crop&auto=format&q=82"
  };

  const protect = (img) => {
    if (!(img instanceof HTMLImageElement) || img.dataset.elamalProtected) return;
    if (img.closest('a[href^="/projects"]') || location.pathname.startsWith("/gallery")) return;
    img.dataset.elamalProtected = "true";

    img.addEventListener("error", () => {
      if (img.dataset.elamalFallback === "true") return;
      const text = `${img.alt || ""} ${img.closest("a")?.getAttribute("href") || ""}`;
      img.dataset.elamalFallback = "true";
      img.srcset = "";
      img.src = /مقال|article|تجهيز|دهان/.test(text) ? photos.painter : photos.interior;
      img.alt = img.alt || "دهانات الأمل";
    }, { once: true });
  };

  const scan = (root = document) => root.querySelectorAll?.("img").forEach(protect);
  scan();
  new MutationObserver((changes) => {
    for (const change of changes) {
      for (const node of change.addedNodes) if (node.nodeType === 1) scan(node);
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
})();

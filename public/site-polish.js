/* Resilient image treatment for CMS content on every route. */
(() => {
  const photos = {
    interior: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&h=900&fit=crop&auto=format&q=82",
    painter: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1200&h=900&fit=crop&auto=format&q=82",
    wall: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=900&fit=crop&auto=format&q=82"
  };

  const pickPhoto = (img) => {
    const text = `${img.alt || ""} ${img.closest("a")?.getAttribute("href") || ""}`.toLowerCase();
    if (/مشروع|project|خارجي|عزل/.test(text)) return photos.wall;
    if (/مقال|article|تجهيز|دهان/.test(text)) return photos.painter;
    return photos.interior;
  };

  const mediaParent = (img) => img.closest('[class*="aspect-"]') || img.parentElement;

  const protect = (img) => {
    if (!(img instanceof HTMLImageElement) || img.dataset.elamalProtected) return;
    img.dataset.elamalProtected = "true";
    const parent = mediaParent(img);
    if (parent) {
      parent.dataset.elamalMedia = "true";
      if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
    }

    const fallback = () => {
      if (img.dataset.elamalFallback === "true") return;
      img.dataset.elamalFallback = "true";
      img.srcset = "";
      img.src = pickPhoto(img);
      img.alt = img.alt || "دهانات الأمل";
      parent?.classList.remove("is-loading");
    };

    img.addEventListener("error", fallback, { once: true });
    if (!img.getAttribute("src")) fallback();
    else if (img.complete && !img.naturalWidth) fallback();
  };

  const fillEmptyMedia = (root = document) => {
    root.querySelectorAll?.("img").forEach(protect);
    root.querySelectorAll?.('[class*="aspect-"]').forEach((box) => {
      if (box.querySelector("img") || box.children.length) return;
      box.dataset.elamalMedia = "true";
      if (getComputedStyle(box).position === "static") box.style.position = "relative";
      const img = document.createElement("img");
      img.alt = "خبرة الأمل في الدهانات والتشطيبات";
      img.src = photos.interior;
      img.loading = "lazy";
      img.decoding = "async";
      img.className = "h-full w-full object-cover";
      box.appendChild(img);
      protect(img);
    });
  };

  fillEmptyMedia();
  const observer = new MutationObserver((changes) => {
    for (const change of changes) {
      for (const node of change.addedNodes) if (node.nodeType === 1) fillEmptyMedia(node);
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("load", () => setTimeout(fillEmptyMedia, 250));
})();

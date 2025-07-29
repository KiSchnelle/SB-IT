// init.js - inject main stylesheet dynamically for all pages

document.addEventListener("DOMContentLoaded", function() {
  // Auto-detect base path for GitHub Pages or local
  let base = "/";
  const pathParts = window.location.pathname.split("/");
  if (pathParts.length > 1 && pathParts[1]) {
    base = `/${pathParts[1]}/`;
  }

  // Inject main stylesheet
  const linkEl = document.createElement("link");
  linkEl.rel = "stylesheet";
  linkEl.href = `${base}styles/main.css`;
  document.head.appendChild(linkEl);
});

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const resolved = new URL(link.getAttribute("href"), window.location.href);
    const linkPath = resolved.pathname.split("/").pop();
    if (linkPath === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll("pre").forEach((pre) => {
    if (pre.querySelector(".copy-button")) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-button";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      let text = "";
      if (code) {
        text = code.textContent;
      } else {
        const clone = pre.cloneNode(true);
        const cloneButton = clone.querySelector(".copy-button");
        if (cloneButton) {
          cloneButton.remove();
        }
        text = clone.textContent;
      }
      text = text.trimEnd();
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied";
      } catch (err) {
        button.textContent = "Press Ctrl+C";
      }
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1200);
    });
    pre.appendChild(button);
  });

  const searchInput = document.querySelector("[data-search-input]");
  if (searchInput) {
    const rows = Array.from(document.querySelectorAll("[data-filter-row]"));
    const update = () => {
      const query = searchInput.value.trim().toLowerCase();
      rows.forEach((row) => {
        const text = (row.getAttribute("data-filter-text") || row.innerText).toLowerCase();
        row.style.display = text.includes(query) ? "" : "none";
      });
    };
    searchInput.addEventListener("input", update);
  }
});

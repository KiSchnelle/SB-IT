// Live filter for the hardware tables on the cluster resources page.
// Any page with an <input data-table-filter> gets it; every other page is untouched.
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[data-table-filter]");
  if (!input) {
    return;
  }
  const rows = Array.from(document.querySelectorAll(".md-typeset table tbody tr"));
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    rows.forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(query);
    });
  });
});

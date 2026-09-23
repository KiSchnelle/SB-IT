// Live node filter on the cluster resources page. Pages without an
// <input data-table-filter> are left untouched.
document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("[data-table-filter]");
  if (!input) {
    return;
  }
  const rows = Array.from(document.querySelectorAll(".hw-section table tbody tr"));
  const sections = Array.from(document.querySelectorAll(".hw-section"));
  const count = document.querySelector("[data-filter-count]");
  const empty = document.querySelector("[data-filter-empty]");
  const total = rows.length;

  const update = () => {
    const query = input.value.trim().toLowerCase();
    let shown = 0;
    rows.forEach((row) => {
      const match = row.textContent.toLowerCase().includes(query);
      row.hidden = !match;
      shown += match ? 1 : 0;
    });
    // Hide a whole node group (heading, summary, table) when none of its nodes match.
    sections.forEach((section) => {
      section.hidden = !section.querySelector("tbody tr:not([hidden])");
    });
    if (count) {
      count.textContent = query ? `${shown} of ${total} nodes` : `${total} nodes`;
    }
    if (empty) {
      empty.hidden = shown > 0;
    }
  };

  input.addEventListener("input", update);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      update();
    }
  });
  update();
});

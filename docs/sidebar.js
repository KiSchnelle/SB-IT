document.addEventListener("DOMContentLoaded", function() {
  const base = "/docs/"; // Change this if your repo/project name is different
  const sidebarHTML = `
    <div id="sidebar" class="sidebar">
      <nav>
        <ul>
          <li><a href="${base}index.html">🏠 Home</a></li>
          <li class="has-children">
            <span class="collapse-toggle" tabindex="0" aria-label="Expand/Collapse">&#9654;</span>
            <a href="${base}cluster_usage.html">Using the SB-HPC cluster</a>
            <ul>
              <li><a href="${base}software/phenix.html">Using Phenix</a></li>
              <li><a href="${base}software/topaz.html">Using Topaz</a></li>
              <li><a href="${base}software/eman2.html">Using Eman2</a></li>
            </ul>
          </li>
          <li><a href="${base}session_guidelines.html">Session and project guidelines</a></li>
          <li><a href="${base}particle_extraction.html">Extracting Particles</a></li>
          <li><a href="${base}data_cleanup.html">Data Cleanup</a></li>
        </ul>
      </nav>
    </div>
    <button id="sidebarToggle" class="sidebar-toggle" aria-label="Open navigation">&#9776;</button>
  `;
  document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

  // Sidebar toggle logic
  const sidebar = document.getElementById('sidebar');
  const toggle = document.getElementById('sidebarToggle');
  toggle.onclick = function() {
    sidebar.classList.toggle('open');
  };
  document.addEventListener('click', function(e) {
    if (
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      e.target !== toggle
    ) {
      sidebar.classList.remove('open');
    }
  });

  // Collapsible logic for submenus
  document.querySelectorAll('.sidebar .has-children .collapse-toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function(e) {
      const parent = toggle.parentElement;
      parent.classList.toggle('expanded');
      e.stopPropagation();
    });
    toggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        toggle.click();
        e.preventDefault();
      }
    });
  });
});
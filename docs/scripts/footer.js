document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
    <footer class="footer">
      <p>
        © Structural Biology Division, University of Osnabrück.
        <a href="https://moeller-lab.com" target="_blank" rel="noopener">
          Our Lab Website
        </a>
      </p>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
});
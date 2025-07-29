// Inject Bootstrap Icons CDN if not present
(function() {
  if (!document.querySelector('link[href*="bootstrap-icons"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
    document.head.appendChild(link);
  }
})();

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('pre > code').forEach(function(codeBlock) {
    const pre = codeBlock.parentElement;

    // Skip if already wrapped
    if (pre.parentElement.classList.contains('code-block')) return;

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create copy button
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.innerHTML = '<i class="bi bi-copy"></i>';
    btn.onclick = function() {
      navigator.clipboard.writeText(codeBlock.innerText).then(() => {
        btn.innerHTML = '<i class="bi bi-clipboard-check"></i>';
        setTimeout(() => btn.innerHTML = '<i class="bi bi-copy"></i>', 1000);
      });
    };
    wrapper.appendChild(btn);
  });
});
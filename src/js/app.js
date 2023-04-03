const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

collapsibleHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    content.classList.toggle('active');
  });
});

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.style.display = (content.style.display === 'none') ? 'block' : 'none';
  });
});

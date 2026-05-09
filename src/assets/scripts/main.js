document.documentElement.classList.add('js');

window.addEventListener('alpine:init', () => {
  document.documentElement.classList.add('alpine-ready');
});

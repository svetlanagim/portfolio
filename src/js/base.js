/* Відновлення сторінки з початку */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  });
});

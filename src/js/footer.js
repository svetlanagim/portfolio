// document.getElementById('year').textContent = new Date().getFullYear();

export function initFooterYear() {
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

initFooterYear();

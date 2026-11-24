const track = document.querySelector('.skills-track');
const list = document.querySelector('.skills-list');

if (track && list) {
  // Для надійності спочатку клонуємо список один раз
  const clone = list.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);

  // Якщо цього недостатньо і трек усе ще вужчий за екран, додаємо клони в циклі
  // Додаємо ще один клон про запас на час анімації
  while (track.offsetWidth < window.innerWidth * 2) {
    const extraClone = list.cloneNode(true);
    extraClone.setAttribute('aria-hidden', 'true');
    track.appendChild(extraClone);
  }
}

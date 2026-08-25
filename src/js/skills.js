const track = document.querySelector('.skills-track');
const list = document.querySelector('.skills-list');

if (track && list) {
  // На всякий случай клонируем первый раз
  const clone = list.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  track.appendChild(clone);

  // Если этого мало и трек всё ещё уже, чем экран, дописываем клоны в цикле
  // Добавляем +1 клон для запаса на время анимации
  while (track.offsetWidth < window.innerWidth * 2) {
    const extraClone = list.cloneNode(true);
    extraClone.setAttribute('aria-hidden', 'true');
    track.appendChild(extraClone);
  }
}

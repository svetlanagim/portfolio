export function initAnimation() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    {
      threshold: 0.15 /* Анимация начнется, когда элемент покажется на 15% */,
    }
  );

  // Запускаем слежку за всеми элементами с классом .anim-el
  document.querySelectorAll('.anim-el').forEach(el => observer.observe(el));
}

// Автозапуск анимаций при загрузке документа — удобно, если не нужен ручной вызов
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimation);
  } else {
    initAnimation();
  }
}

export function initAnimation() {
  const elements = document.querySelectorAll('.anim-el');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
}

initAnimation();

const burgerBtn = document.getElementById('burgerBtn');
const navbarMenu = document.getElementById('navbarMenu');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

// Функція повного закриття всіх елементів меню
function closeMenu() {
  burgerBtn.classList.remove('active');
  navbarMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  body.classList.remove('no-scroll');
}

// Перемикання класів при натисканні на бургер
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  navbarMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active'); // Перемикаємо затемнення фону
  body.classList.toggle('no-scroll');
});

// Закриття меню при виборі будь-якого пункту (для мобільних пристроїв)
const menuLinks = document.querySelectorAll('.navbar-link, .cvbtn');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Закриття меню при натисканні на затемнену область (за межами меню шириною 70vw)
menuOverlay.addEventListener('click', () => {
  closeMenu();
});

// Захист від блокування прокручування, якщо вікно браузера вручну змінили в розмірі
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1200 && navbarMenu.classList.contains('active')) {
    closeMenu();
  }
});

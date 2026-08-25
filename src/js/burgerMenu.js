const burgerBtn = document.getElementById('burgerBtn');
const navbarMenu = document.getElementById('navbarMenu');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

// Функция полного закрытия всех элементов меню
function closeMenu() {
  burgerBtn.classList.remove('active');
  navbarMenu.classList.remove('active');
  menuOverlay.classList.remove('active');
  body.classList.remove('no-scroll');
}

// Тоггл классов при клике на бургер
burgerBtn.addEventListener('click', () => {
  burgerBtn.classList.toggle('active');
  navbarMenu.classList.toggle('active');
  menuOverlay.classList.toggle('active'); // Переключаем затемнение фона
  body.classList.toggle('no-scroll');
});

// Закрытие меню при выборе любого пункта (для мобилок)
const menuLinks = document.querySelectorAll('.navbar-link, .cvbtn');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarMenu.classList.contains('active')) {
      closeMenu();
    }
  });
});

// Закрытие меню при клике на затемненную область (вне зоны 70vw меню)
menuOverlay.addEventListener('click', () => {
  closeMenu();
});

// Защита от блокировки скролла, если окно браузера растянули вручную
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1200 && navbarMenu.classList.contains('active')) {
    closeMenu();
  }
});

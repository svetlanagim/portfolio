const translations = {
  en: {
    home: 'Home',
    projects: 'Projects',
    contact: 'Contact',
    resume: 'My Resume',

    heroHello: "Hello, I'm",
    heroAndIm: "And I'm a",
    heroProfession: 'Frontend Developer',
    heroDescription:
      'I craft clean, responsive web interfaces with a strong eye for detail, accessibility, and seamless usability. Expert in building modern layouts using <strong>Flexbox</strong> and <strong>Grid</strong>, powered by JavaScript and tracked with Git.',
    heroProjects: 'My Projects',
    heroContact: 'Contact Me',

    // projectsTitle: 'Projects',
    individualProject: 'Individual project',
    teamProject: 'Team project',
    frontendDeveloper: 'Front-End Developer',
    teamLead: 'Team Lead, Front-End Developer',
    livePage: 'Live page',

    // contactTitle: 'Contact',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    messagePlaceholder: 'Tell me about your project...',

    sendMessage: 'Send Message',
    sending: 'Sending...',
    messageSent: 'Message sent successfully!',
    messageError: 'Something went wrong. Please try again.',

    footerText: "Let's create something together.",
    rightsReserved: 'All rights reserved.',
    backToTop: 'Back to top ↑',
  },

  uk: {
    home: 'Головна',
    projects: 'Проєкти',
    contact: 'Контакти',
    resume: 'Моє резюме',

    heroHello: 'Привіт, я',
    heroAndIm: 'і я',
    heroProfession: 'Frontend-розробниця',
    heroDescription:
      'Створюю чисті, адаптивні вебінтерфейси, приділяючи особливу увагу деталям, доступності та зручності користування. Впевнено працюю із сучасними макетами на <strong>Flexbox</strong> і <strong>Grid</strong>, використовую JavaScript та Git.',
    heroProjects: 'Мої проєкти',
    heroContact: "Зв'язатися зі мною",

    // projectsTitle: 'Проєкти',
    individualProject: 'Індивідуальний проєкт',
    teamProject: 'Командний проєкт',
    frontendDeveloper: 'Front-End розробниця',
    teamLead: 'Тімлід, Front-End розробниця',
    livePage: 'Переглянути сайт',

    // contactTitle: 'Контакти',
    nameLabel: "Ім'я",
    namePlaceholder: "Ваше ім'я",
    emailLabel: 'Електронна пошта',
    messageLabel: 'Повідомлення',
    messagePlaceholder: 'Розкажіть про свій проєкт...',

    sendMessage: 'Надіслати повідомлення',
    sending: 'Надсилання...',
    messageSent: 'Повідомлення успішно надіслано!',
    messageError: 'Сталася помилка. Спробуйте ще раз.',

    footerText: 'Створімо щось разом.',
    rightsReserved: 'Усі права захищено.',
    backToTop: 'Нагору ↑',
  },
};
window.translations = translations;

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    const translation = translations[lang][key];

    if (translation) {
      element.innerHTML = translation;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.dataset.i18nPlaceholder;
    const translation = translations[lang][key];

    if (translation) {
      element.placeholder = translation;
    }
  });
  document.documentElement.lang = lang;
  localStorage.setItem('language', lang);

  document.querySelectorAll('.lang-btn').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });
}

const savedLanguage = localStorage.getItem('language') || 'uk';

setLanguage(savedLanguage);

document.querySelectorAll('.lang-btn').forEach(button => {
  button.addEventListener('click', () => {
    setLanguage(button.dataset.lang);
  });
});

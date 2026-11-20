const privacyTranslations = {
  en: {
    backToWebsite: '← Back to website',
    title: 'Privacy Policy',
    updated: 'Last updated: November 20, 2026',

    introTitle: '1. Introduction',
    intro:
      'This policy explains how personal data submitted through the contact form is processed.',

    dataTitle: '2. Information We Collect',
    dataIntro: 'The contact form may collect:',
    dataName: 'Your name.',
    dataEmail: 'Your email address.',
    dataMessage: 'Your message.',

    purposeTitle: '3. How We Use Your Data',
    purpose:
      'Your data is used only to respond to enquiries and discuss potential projects. It is not used for marketing.',

    sharingTitle: '4. Data Processing and Sharing',
    sharing:
      'Messages are processed through Vercel and may be sent via Telegram Bot API and Resend. These providers may process data in different countries. Your data is not sold or shared for advertising.',

    storageTitle: '5. Data Storage and Security',
    storage:
      'Your data is processed and stored by the services used to operate this website and deliver messages. Retention periods depend on the providers’ policies.',

    rightsTitle: '6. Your Rights',
    rightsIntro: 'You may have the right to:',
    rightAccess: 'Access your personal data.',
    rightCorrection: 'Correct or delete your data.',
    rightWithdraw: 'Withdraw your consent at any time.',

    contactTitle: '7. Contact',
    contactText:
      'For questions about this policy or your personal data, contact:',
  },

  uk: {
    backToWebsite: '← На головну',
    title: 'Політика конфіденційності',
    updated: 'Оновлено: 20 листопада 2026 року',

    introTitle: '1. Вступ',
    intro:
      'Ця політика пояснює, як обробляються персональні дані, надані через контактну форму.',

    dataTitle: '2. Які дані ми збираємо',
    dataIntro: 'Контактна форма може збирати:',
    dataName: "Ваше ім'я.",
    dataEmail: 'Вашу електронну адресу.',
    dataMessage: 'Ваше повідомлення.',

    purposeTitle: '3. Використання даних',
    purpose:
      'Ваші дані використовуються лише для відповіді на звернення та обговорення можливих проєктів. Вони не використовуються для маркетингу.',

    sharingTitle: '4. Обробка та передача даних',
    sharing:
      'Повідомлення обробляються через Vercel і можуть надсилатися через Telegram Bot API та Resend. Ці сервіси можуть обробляти дані в різних країнах. Ваші дані не продаються та не передаються для реклами.',

    storageTitle: '5. Зберігання та захист даних',
    storage:
      'Ваші дані обробляються та зберігаються сервісами, що забезпечують роботу сайту й надсилання повідомлень. Строки зберігання залежать від політик цих сервісів.',

    rightsTitle: '6. Ваші права',
    rightsIntro: 'Ви можете мати право:',
    rightAccess: 'Отримати доступ до своїх даних.',
    rightCorrection: 'Виправити або видалити свої дані.',
    rightWithdraw: 'Відкликати згоду на обробку даних у будь-який час.',

    contactTitle: '7. Контакти',
    contactText:
      'Якщо у вас є запитання щодо цієї політики або ваших персональних даних, звертайтеся:',
  },
};

const langButtons = document.querySelectorAll('.privacy-lang button');

function setPrivacyLanguage(lang) {
  const translations = privacyTranslations[lang];

  if (!translations) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;

    if (Object.hasOwn(translations, key)) {
      element.textContent = translations[key];
    }
  });

  langButtons.forEach(button => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  localStorage.setItem('language', lang);
}

langButtons.forEach(button => {
  button.addEventListener('click', () => {
    setPrivacyLanguage(button.dataset.lang);
  });
});

setPrivacyLanguage(localStorage.getItem('language') || 'uk');

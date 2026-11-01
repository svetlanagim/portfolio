const form = document.querySelector('.feedback-form');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const button = form.querySelector('.form-btn');
    const status = form.querySelector('.form-status');

    if (!button || button.disabled) return;

    // Отримуємо поточну мову сайту
    const lang = localStorage.getItem('language') || 'en';
    const text = translations[lang] || window.translations.en;

    const originalText = button.innerHTML;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get('user-name') || '').trim(),
      email: String(formData.get('user-email') || '').trim(),
      comment: String(formData.get('user-comment') || '').trim(),
    };

    // Блокуємо кнопку на час надсилання
    button.disabled = true;

    const buttonText = button.querySelector('[data-i18n="sendMessage"]');

    if (buttonText) {
      buttonText.textContent = text.sending;
    }

    // Очищаємо попереднє повідомлення
    if (status) {
      status.textContent = '';
      status.className = 'form-status';
    }

    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error('Could not send the message');
      }

      // Очищаємо форму після успішного надсилання
      form.reset();

      // Показуємо повідомлення про успіх
      if (status) {
        status.textContent = text.messageSent;
        status.className = 'form-status success';
      }
    } catch (error) {
      console.error('Помилка надсилання повідомлення:', error);

      // Показуємо повідомлення про помилку
      if (status) {
        status.textContent = text.messageError;
        status.className = 'form-status error';
      }
    } finally {
      // Повертаємо кнопку до початкового стану
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
}

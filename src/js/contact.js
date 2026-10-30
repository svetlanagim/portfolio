const form = document.querySelector('.feedback-form');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const button = form.querySelector('.form-btn');
    if (!button || button.disabled) return;

    const originalText = button.textContent;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get('user-name') || '').trim(),
      email: String(formData.get('user-email') || '').trim(),
      comment: String(formData.get('user-comment') || '').trim(),
    };

    button.disabled = true;
    button.textContent = 'Sending...';

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

      alert('Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Could not send the message. Please try again.');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

export default async function handler(req, res) {
  // Принимаем только POST-запросы
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  // Секреты доступны только серверу Vercel
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram environment variables are missing');

    return res.status(500).json({
      success: false,
      message: 'Server configuration error',
    });
  }

  // Проверяем поля формы
  const { name, email, comment } = req.body || {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof comment !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      message: 'Invalid form data',
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanComment = comment.trim();

  if (
    !cleanName ||
    cleanName.length > 100 ||
    !cleanEmail ||
    cleanEmail.length > 254 ||
    cleanComment.length > 2000
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please check the form fields',
    });
  }

  // Простая проверка формата email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email',
    });
  }

  // Отправляем обычный текст, чтобы пользовательские
  // данные не интерпретировались как Markdown
  const text = [
    '🔔 Новая заявка с сайта!',
    '',
    `👤 Имя: ${cleanName}`,
    `📧 Email: ${cleanEmail}`,
    `💬 Сообщение: ${cleanComment || 'Без комментария'}`,
  ].join('\n');

  try {
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
        signal: AbortSignal.timeout(10000),
      }
    );

    const result = await telegramResponse.json();

    if (!telegramResponse.ok || !result.ok) {
      console.error('Telegram rejected the message');

      return res.status(502).json({
        success: false,
        message: 'Could not send the message',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Telegram request failed:', error.message);

    return res.status(502).json({
      success: false,
      message: 'Telegram is temporarily unavailable',
    });
  }
}

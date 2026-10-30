export default async function handler(req, res) {
  // Приймаємо тільки POST-запити
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      message: 'Метод не дозволений',
    });
  }

  // Секретні дані доступні лише серверу Vercel
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Відсутні змінні середовища Telegram');

    return res.status(500).json({
      success: false,
      message: 'Помилка конфігурації сервера',
    });
  }

  // Перевіряємо поля форми
  const { name, email, comment } = req.body || {};

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof comment !== 'string'
  ) {
    return res.status(400).json({
      success: false,
      message: 'Некоректні дані форми',
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
      message: 'Перевірте правильність заповнення полів',
    });
  }

  // Проста перевірка формату електронної пошти
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Некоректна адреса електронної пошти',
    });
  }

  // Надсилаємо звичайний текст, щоб дані користувача
  // не інтерпретувалися як Markdown
  const text = [
    '🔔 Заявка з сайту Портфоліо!',
    '',
    `👤 Ім'я: ${cleanName}`,
    `📧 Email: ${cleanEmail}`,
    `💬 Повідомлення: ${cleanComment || 'Без коментаря'}`,
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
      console.error('Telegram відхилив повідомлення');

      return res.status(502).json({
        success: false,
        message: 'Не вдалося надіслати повідомлення',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Повідомлення успішно надіслано',
    });
  } catch (error) {
    console.error('Помилка запиту до Telegram:', error.message);

    return res.status(502).json({
      success: false,
      message: 'Telegram тимчасово недоступний',
    });
  }
}

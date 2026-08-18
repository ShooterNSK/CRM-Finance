const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Простое правило эскалации-заглушка: пока без реального AI.
// Когда подключите Anthropic API — замените эту функцию на настоящий вызов модели.
function generateAiReply(message) {
  const text = message.toLowerCase();

  if (text.includes('бухгалтер') || text.includes('живо')) {
    return { reply: null, escalate: true };
  }
  if (text.includes('аванс') || text.includes('рассчит')) {
    return {
      reply: 'При УСН 6% налог считается как 6% от дохода за период. Уточните сумму дохода — посчитаю точнее.',
      escalate: false,
    };
  }
  if (text.includes('срок')) {
    return {
      reply: 'Для ИП на УСН: авансовые платежи — до 28 числа месяца после квартала, годовая декларация — до 25 апреля.',
      escalate: false,
    };
  }
  return {
    reply: 'Хороший вопрос — уточню детали по вашей карточке. Если понадобится, подключу бухгалтера.',
    escalate: false,
  };
}

// Отправка сообщения в чат (от клиента) — сохраняет сообщение и возвращает ответ AI
router.post('/message', async (req, res) => {
  const { client_id, message } = req.body;

  if (!client_id || !message) {
    return res.status(400).json({ error: 'Нужны client_id и message' });
  }

  try {
    await pool.query(
      `INSERT INTO chat_messages (client_id, sender, message) VALUES ($1, 'client', $2)`,
      [client_id, message]
    );

    const { reply, escalate } = generateAiReply(message);

    if (escalate) {
      await pool.query(
        `INSERT INTO chat_messages (client_id, sender, message, escalated)
         VALUES ($1, 'system', 'Подключаю бухгалтера к чату', TRUE)`,
        [client_id]
      );
      return res.json({ escalated: true, message: 'Подключаю к чату бухгалтера — специалист присоединится в течение 15 минут.' });
    }

    await pool.query(
      `INSERT INTO chat_messages (client_id, sender, message) VALUES ($1, 'ai', $2)`,
      [client_id, reply]
    );
    res.json({ escalated: false, message: reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при обработке сообщения' });
  }
});

// История переписки клиента (и с AI, и с бухгалтером — единая лента)
router.get('/history/:clientId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM chat_messages WHERE client_id = $1 ORDER BY created_at ASC',
      [req.params.clientId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении истории чата' });
  }
});

module.exports = router;

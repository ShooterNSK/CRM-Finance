const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Регистрация бухгалтера (анкета уходит на модерацию — is_approved = false по умолчанию)
router.post('/', async (req, res) => {
  const { telegram_id, full_name, inn, specialization, experience_years } = req.body;

  if (!telegram_id || !full_name || !inn) {
    return res.status(400).json({ error: 'Заполните обязательные поля: telegram_id, full_name, inn' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO accountants (telegram_id, full_name, inn, specialization, experience_years)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [telegram_id, full_name, inn, specialization, experience_years]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось сохранить анкету бухгалтера' });
  }
});

// Список бухгалтеров, доступных для консультаций (одобренные модерацией и свободные)
router.get('/available', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, full_name, specialization FROM accountants WHERE is_approved = TRUE AND is_available = TRUE'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении списка бухгалтеров' });
  }
});

module.exports = router;

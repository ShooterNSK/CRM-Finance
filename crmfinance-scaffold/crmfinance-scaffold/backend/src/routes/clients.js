const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Регистрация нового клиента (ИП / самозанятый / ООО)
router.post('/', async (req, res) => {
  const {
    telegram_id, client_type, full_name, inn, ogrn,
    tax_regime, employees_count, region, integration_1c,
  } = req.body;

  if (!telegram_id || !client_type || !full_name || !inn) {
    return res.status(400).json({ error: 'Заполните обязательные поля: telegram_id, client_type, full_name, inn' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO clients
        (telegram_id, client_type, full_name, inn, ogrn, tax_regime, employees_count, region, integration_1c)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [telegram_id, client_type, full_name, inn, ogrn, tax_regime, employees_count || 0, region, integration_1c || 'none']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Не удалось сохранить клиента' });
  }
});

// Получить карточку клиента по Telegram ID
router.get('/:telegramId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clients WHERE telegram_id = $1',
      [req.params.telegramId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при получении клиента' });
  }
});

module.exports = router;

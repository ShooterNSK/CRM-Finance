const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

// Заглушка на будущее. Когда дойдёте до реальной интеграции с 1С,
// здесь появится обмен с веб-сервисом 1С (HTTP-сервисы / OData / EnterpriseData).
// Пока — просто сохраняет выбранный клиентом способ интеграции.
router.post('/1c', async (req, res) => {
  const { client_id, integration_1c } = req.body;

  const allowed = ['none', 'fresh', 'desktop', 'zup'];
  if (!client_id || !allowed.includes(integration_1c)) {
    return res.status(400).json({ error: `integration_1c должен быть одним из: ${allowed.join(', ')}` });
  }

  try {
    const result = await pool.query(
      'UPDATE clients SET integration_1c = $1 WHERE id = $2 RETURNING *',
      [integration_1c, client_id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Клиент не найден' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка при сохранении настроек интеграции' });
  }
});

module.exports = router;

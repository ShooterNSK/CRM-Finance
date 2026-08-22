require('dotenv').config();
const express = require('express');
const cors = require('cors');

const clientsRouter = require('./routes/clients');
const accountantsRouter = require('./routes/accountants');
const chatRouter = require('./routes/chat');
const integrationsRouter = require('./routes/integrations');

const app = express();
app.use(cors());
app.use(express.json());

// Проверка, что сервер жив (удобно для мониторинга и для проверки после деплоя)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsRouter);
app.use('/api/accountants', accountantsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/integrations', integrationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CRM Finance backend запущен на порту ${PORT}`);
});

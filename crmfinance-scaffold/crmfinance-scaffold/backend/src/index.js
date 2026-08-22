const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const errorHandler = require('./middleware/error-handler');
const clientsRouter = require('./routes/clients');
const accountantsRouter = require('./routes/accountants');
const chatRouter = require('./routes/chat');
const integrationsRouter = require('./routes/integrations');

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: config.corsOrigin === '*' ? true : config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/clients', clientsRouter);
app.use('/api/accountants', accountantsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/integrations', integrationsRouter);
app.use(errorHandler);

if (require.main === module) app.listen(config.port, () => console.log(`CRM Finance backend запущен на порту ${config.port}`));
module.exports = app;

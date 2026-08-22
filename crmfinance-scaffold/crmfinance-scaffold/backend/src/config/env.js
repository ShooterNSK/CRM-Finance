require('dotenv').config();
module.exports = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || null,
  aiProvider: process.env.AI_PROVIDER || 'rule-based',
  aiApiKey: process.env.AI_API_KEY || null,
  aiModel: process.env.AI_MODEL || 'gpt-4o-mini',
  aiBaseUrl: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
};

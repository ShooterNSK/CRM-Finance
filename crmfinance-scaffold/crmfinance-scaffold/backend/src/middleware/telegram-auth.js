const crypto = require('crypto');
function validateTelegramWebAppData(initData, botToken) {
  if (!initData || !botToken) return null;
  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash'); if (!receivedHash) return null;
  params.delete('hash');
  const check = [...params.entries()].sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => `${k}=${v}`).join('\n');
  const secret = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
  const calculated = crypto.createHmac('sha256', secret).update(check).digest('hex');
  if (calculated.length !== receivedHash.length || !crypto.timingSafeEqual(Buffer.from(calculated), Buffer.from(receivedHash))) return null;
  try { return JSON.parse(params.get('user') || 'null'); } catch { return null; }
}
module.exports = (config) => (req,res,next) => {
  if (process.env.NODE_ENV === 'test' || process.env.DISABLE_TELEGRAM_AUTH === 'true') return next();
  const user = validateTelegramWebAppData(req.get('x-telegram-init-data'), config.telegramBotToken);
  if (!user) return res.status(401).json({ error: 'Telegram authentication required' });
  req.telegramUser = user; next();
};
module.exports.validateTelegramWebAppData = validateTelegramWebAppData;

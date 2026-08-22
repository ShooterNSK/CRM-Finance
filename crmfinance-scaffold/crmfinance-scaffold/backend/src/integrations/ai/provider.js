class RuleBasedAIProvider {
  async reply(message) {
    const text = String(message || '').toLowerCase();
    if (text.includes('бухгалтер') || text.includes('жив')) return { reply: null, escalate: true };
    if (text.includes('аванс') || text.includes('рассчит')) return { reply: 'При УСН 6% налог считается как 6% от дохода за период. Уточните сумму дохода — посчитаю точнее.', escalate: false };
    if (text.includes('срок')) return { reply: 'Для ИП на УСН: авансовые платежи — до 28 числа месяца после квартала, годовая декларация — до 25 апреля.', escalate: false };
    return { reply: 'Хороший вопрос — уточню детали по вашей карточке. Если понадобится, подключу бухгалтера.', escalate: false };
  }
}

class OpenAIProvider {
  constructor(config) { this.apiKey = config.aiApiKey; this.model = config.aiModel || 'gpt-4o-mini'; this.baseUrl = config.aiBaseUrl || 'https://api.openai.com/v1'; }
  async reply(message) {
    if (!this.apiKey) throw new Error('AI_API_KEY is required for OpenAI provider');
    const response = await fetch(`${this.baseUrl}/chat/completions`, { method: 'POST', headers: { Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: this.model, temperature: 0.2, messages: [{ role: 'system', content: 'Ты помощник CRM Finance. Отвечай кратко и по делу. Не выдавай юридические или налоговые гарантии.' }, { role: 'user', content: String(message) }] }) });
    if (!response.ok) throw new Error(`AI provider error: ${response.status}`);
    const data = await response.json();
    return { reply: data.choices?.[0]?.message?.content || 'Не удалось получить ответ AI.', escalate: false };
  }
}

function createAIProvider(config) { return config.aiProvider === 'openai' ? new OpenAIProvider(config) : new RuleBasedAIProvider(); }
module.exports = { RuleBasedAIProvider, OpenAIProvider, createAIProvider };

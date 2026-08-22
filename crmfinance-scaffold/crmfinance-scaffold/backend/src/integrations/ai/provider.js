class RuleBasedAIProvider {
  async reply(message) {
    const text = String(message || '').toLowerCase();
    if (text.includes('бухгалтер') || text.includes('живо')) return { reply: null, escalate: true };
    if (text.includes('аванс') || text.includes('рассчит')) return { reply: 'При УСН 6% налог считается как 6% от дохода за период. Уточните сумму дохода — посчитаю точнее.', escalate: false };
    if (text.includes('срок')) return { reply: 'Для ИП на УСН: авансовые платежи — до 28 числа месяца после квартала, годовая декларация — до 25 апреля.', escalate: false };
    return { reply: 'Хороший вопрос — уточню детали по вашей карточке. Если понадобится, подключу бухгалтера.', escalate: false };
  }
}
function createAIProvider() { return new RuleBasedAIProvider(); }
module.exports = { RuleBasedAIProvider, createAIProvider };

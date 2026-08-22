class ChatRepository {
  constructor(pool) { this.pool = pool; }
  async addMessage({ clientId, sender, message, accountantId = null, escalated = false }) {
    const result = await this.pool.query(`INSERT INTO chat_messages (client_id, accountant_id, sender, message, escalated) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [clientId, accountantId, sender, message, escalated]);
    return result.rows[0];
  }
  async history(clientId) { const result = await this.pool.query('SELECT * FROM chat_messages WHERE client_id = $1 ORDER BY created_at ASC', [clientId]); return result.rows; }
}
module.exports = ChatRepository;

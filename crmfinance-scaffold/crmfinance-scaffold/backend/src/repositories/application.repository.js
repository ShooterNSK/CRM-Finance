class ApplicationRepository {
  constructor(pool) { this.pool = pool; }
  async create({ clientId, type }) {
    const r = await this.pool.query('INSERT INTO applications (client_id, type) VALUES ($1,$2) RETURNING *', [clientId, type]);
    return r.rows[0];
  }
  async listByClient(clientId) {
    const r = await this.pool.query('SELECT * FROM applications WHERE client_id = $1 ORDER BY created_at DESC', [clientId]);
    return r.rows;
  }
  async updateStatus(id, status) {
    const r = await this.pool.query('UPDATE applications SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *', [status, id]);
    return r.rows[0] || null;
  }
}
module.exports = ApplicationRepository;

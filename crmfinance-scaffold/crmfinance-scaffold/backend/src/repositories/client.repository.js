class ClientRepository {
  constructor(pool) { this.pool = pool; }
  async create(data) {
    const { telegram_id, client_type, full_name, inn, ogrn, tax_regime, employees_count, region, integration_1c } = data;
    const r = await this.pool.query(`INSERT INTO clients (telegram_id, client_type, full_name, inn, ogrn, tax_regime, employees_count, region, integration_1c) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, [telegram_id, client_type, full_name, inn, ogrn, tax_regime, employees_count || 0, region, integration_1c || 'none']);
    return r.rows[0];
  }
  async findByTelegramId(id) { const r = await this.pool.query('SELECT * FROM clients WHERE telegram_id = $1', [id]); return r.rows[0] || null; }
  async updateIntegration(id, value) { const r = await this.pool.query('UPDATE clients SET integration_1c = $1 WHERE id = $2 RETURNING *', [value, id]); return r.rows[0] || null; }
}
module.exports = ClientRepository;

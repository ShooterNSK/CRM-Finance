class AccountantRepository {
  constructor(pool) { this.pool = pool; }
  async create(data) {
    const { telegram_id, full_name, inn, specialization, experience_years } = data;
    const r = await this.pool.query(`INSERT INTO accountants (telegram_id, full_name, inn, specialization, experience_years) VALUES ($1,$2,$3,$4,$5) RETURNING *`, [telegram_id, full_name, inn, specialization, experience_years]);
    return r.rows[0];
  }
  async available() {
    const r = await this.pool.query('SELECT id, full_name, specialization FROM accountants WHERE is_approved = TRUE AND is_available = TRUE');
    return r.rows;
  }
}
module.exports = AccountantRepository;

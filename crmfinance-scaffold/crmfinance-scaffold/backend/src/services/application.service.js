class ApplicationService {
  constructor(repository) { this.repository = repository; }
  async create({ clientId, type }) {
    const allowed = ['report', 'consultation', 'tax_calc'];
    if (!clientId || !allowed.includes(type)) throw Object.assign(new Error(`type должен быть одним из: ${allowed.join(', ')}`), { status: 400 });
    return this.repository.create({ clientId, type });
  }
  listByClient(clientId) { return this.repository.listByClient(clientId); }
  async updateStatus(id, status) {
    if (!['new', 'in_progress', 'done', 'cancelled'].includes(status)) throw Object.assign(new Error('Недопустимый статус заявки'), { status: 400 });
    const result = await this.repository.updateStatus(id, status);
    if (!result) throw Object.assign(new Error('Заявка не найдена'), { status: 404 });
    return result;
  }
}
module.exports = ApplicationService;

class ClientService {
  constructor(repository) { this.repository = repository; }
  create(data) {
    if (!data.telegram_id || !data.client_type || !data.full_name || !data.inn) throw Object.assign(new Error('Заполните обязательные поля: telegram_id, client_type, full_name, inn'), { status: 400 });
    return this.repository.create(data);
  }
  async getByTelegramId(id) { const client = await this.repository.findByTelegramId(id); if (!client) throw Object.assign(new Error('Клиент не найден'), { status: 404 }); return client; }
}
module.exports = ClientService;

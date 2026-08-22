class AccountantService {
  constructor(repository) { this.repository = repository; }
  create(data) {
    if (!data.telegram_id || !data.full_name || !data.inn) throw Object.assign(new Error('Заполните обязательные поля: telegram_id, full_name, inn'), { status: 400 });
    return this.repository.create(data);
  }
  available() { return this.repository.available(); }
}
module.exports = AccountantService;

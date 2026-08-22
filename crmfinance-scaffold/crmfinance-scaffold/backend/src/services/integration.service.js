class IntegrationService {
  constructor(clientRepository) { this.clientRepository = clientRepository; }
  async set1C(clientId, integration) {
    const allowed = ['none', 'fresh', 'desktop', 'zup'];
    if (!clientId || !allowed.includes(integration)) throw Object.assign(new Error(`integration_1c должен быть одним из: ${allowed.join(', ')}`), { status: 400 });
    const client = await this.clientRepository.updateIntegration(clientId, integration);
    if (!client) throw Object.assign(new Error('Клиент не найден'), { status: 404 });
    return client;
  }
}
module.exports = IntegrationService;

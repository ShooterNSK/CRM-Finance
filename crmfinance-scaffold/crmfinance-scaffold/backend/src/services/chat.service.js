class ChatService {
  constructor({ chatRepository, aiProvider }) { this.chatRepository = chatRepository; this.aiProvider = aiProvider; }
  async sendMessage({ clientId, message }) {
    await this.chatRepository.addMessage({ clientId, sender: 'client', message });
    const result = await this.aiProvider.reply(message);
    if (result.escalate) {
      await this.chatRepository.addMessage({ clientId, sender: 'system', message: 'Подключаю бухгалтера к чату', escalated: true });
      return { escalated: true, message: 'Подключаю к чату бухгалтера — специалист присоединится в течение 15 минут.' };
    }
    await this.chatRepository.addMessage({ clientId, sender: 'ai', message: result.reply });
    return { escalated: false, message: result.reply };
  }
  history(clientId) { return this.chatRepository.history(clientId); }
}
module.exports = ChatService;

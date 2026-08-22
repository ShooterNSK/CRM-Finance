module.exports = ({ chatService }) => ({
  send: async (req,res) => {
    const { client_id, message } = req.body;
    if (!client_id || !message) return res.status(400).json({ error: 'Нужны client_id и message' });
    try { return res.json(await chatService.sendMessage({ clientId: client_id, message })); }
    catch (err) { console.error(err); return res.status(500).json({ error: 'Ошибка при обработке сообщения' }); }
  },
  history: async (req,res) => {
    try { return res.json(await chatService.history(req.params.clientId)); }
    catch (err) { console.error(err); return res.status(500).json({ error: 'Ошибка при получении истории чата' }); }
  }
});

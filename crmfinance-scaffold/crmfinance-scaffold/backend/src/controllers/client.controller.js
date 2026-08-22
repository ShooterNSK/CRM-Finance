module.exports = ({ service }) => ({
  create: async (req, res, next) => { try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); } },
  getByTelegramId: async (req, res, next) => { try { res.json(await service.getByTelegramId(req.params.telegramId)); } catch (e) { next(e); } },
});

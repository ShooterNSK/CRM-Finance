module.exports = ({ service }) => ({
  create: async (req, res, next) => { try { res.status(201).json(await service.create(req.body)); } catch (e) { next(e); } },
  available: async (req, res, next) => { try { res.json(await service.available()); } catch (e) { next(e); } },
});

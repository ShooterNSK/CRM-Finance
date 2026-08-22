module.exports = ({ service }) => ({
  create: async (req, res, next) => { try { res.status(201).json(await service.create({ clientId: req.body.client_id, type: req.body.type })); } catch (e) { next(e); } },
  list: async (req, res, next) => { try { res.json(await service.listByClient(req.params.clientId)); } catch (e) { next(e); } },
  updateStatus: async (req, res, next) => { try { res.json(await service.updateStatus(req.params.id, req.body.status)); } catch (e) { next(e); } },
});

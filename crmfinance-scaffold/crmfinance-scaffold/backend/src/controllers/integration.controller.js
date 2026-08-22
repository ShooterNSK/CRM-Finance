module.exports = ({ service }) => ({
  set1C: async (req, res, next) => { try { res.json(await service.set1C(req.body.client_id, req.body.integration_1c)); } catch (e) { next(e); } },
});

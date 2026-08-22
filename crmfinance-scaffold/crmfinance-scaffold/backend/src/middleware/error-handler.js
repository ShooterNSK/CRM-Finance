module.exports = (err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = Number.isInteger(err.status) ? err.status : (err.statusCode || 500);
  res.status(status).json({ error: status >= 500 ? 'Internal server error' : (err.publicMessage || err.message) });
};

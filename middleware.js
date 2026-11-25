// Logger: cetak method dan URL setiap request
function logger(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}

// requireAuth: lindungi route dengan token di header
function requireAuth(req, res, next) {
  const token = req.headers['x-token'];
  if (token !== 'secret123') {
    const err = new Error('Unauthorized: token tidak ada atau salah');
    err.status = 401;
    return next(err);
  }
  next();
}

// 404 untuk URL yang tidak dikenal
function notFound(req, res, next) {
  const err = new Error(`URL ${req.originalUrl} not found`);
  err.status = 404;
  next(err);
}

// Error handler: WAJIB 4 parameter, dipasang paling akhir
function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
}

module.exports = { logger, requireAuth, notFound, errorHandler };
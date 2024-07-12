function restrictAccess(req, res, next) {
  const allowedOrigin = process.env.ALLOWED_ORIGIN;

  const referer = req.get('Referer');
  const origin = req.get('Origin');

  if ((referer && referer.includes(allowedOrigin)) || (origin && origin.includes(allowedOrigin))) {
    return next();
  } else {
    return res.status(403).json({ error: 'Access denied' });
  }
}

module.exports = restrictAccess;
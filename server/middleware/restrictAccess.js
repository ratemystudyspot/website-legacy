import { ALLOWED_ORIGINS } from "../config/config";

function restrictAccess(req, res, next) {
  const allowedOriginList = ALLOWED_ORIGINS.split(",");

  const referer = req.get('Referer');
  const origin = req.get('Origin');
  const isRefererIncluded = referer.includes(allowedOriginList[0]) || referer.includes(allowedOriginList[1]);
  const isOriginIncluded = origin.includes(allowedOriginList[0]) || origin.includes(allowedOriginList[1]);
  

  if ((referer && isRefererIncluded) || (origin && isOriginIncluded)) {
    return next();
  } else {
    return res.status(403).json({ error: 'Access denied' });
  }
}

module.exports = restrictAccess;
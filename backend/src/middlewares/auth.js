const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');
const { findUserById } = require('../services/userStore');

async function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next({ statusCode: 401, message: 'Authorization token is required' });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await findUserById(payload.userId);

    if (!user) {
      return next({ statusCode: 401, message: 'Invalid token user' });
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    return next();
  } catch (_error) {
    return next({ statusCode: 401, message: 'Invalid or expired token' });
  }
}

module.exports = authenticate;

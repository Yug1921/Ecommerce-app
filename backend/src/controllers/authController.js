const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');
const { createUser, findUserByEmail } = require('../services/userStore');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return next({ statusCode: 409, message: 'Email is already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, passwordHash });
    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return next({ statusCode: 401, message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return next({ statusCode: 401, message: 'Invalid email or password' });
    }

    const token = generateToken(user.id);

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    return next(error);
  }
}

function me(req, res) {
  return res.json({
    success: true,
    data: {
      user: req.user
    }
  });
}

module.exports = {
  register,
  login,
  me
};

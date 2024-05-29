const authService = require('../services/authService');

async function login(req, res) {
  try {
    await authService.authenticateUser(req.body); // {email, password}
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

async function sendRecoveryEmail(req, res) {
  try {
    await authService.sendRecoveryEmail(req.body); // {email}
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

async function resetPassword() {
  try {
    await authService.resetPassword(req.body); // {url, password}
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

module.exports = { 
  login,
  sendRecoveryEmail,
  resetPassword,
};

const authService = require('../services/authService');

async function login(req, res) {
  try {
    const response = await authService.authenticateUser(req.body); // {email, password}
    return res.status(200).json({ message: "Login successful:", response });
  } catch (error) {
    if (error.message === "Incorrect Password") {
      return res.status(401).send(error.message);
    }
    if (error.message === "Email not found") {
      return res.status(401).send(error.message);
    }
    return res.sendStatus(500);
  }
}

async function register(req, res) {
  try {
    const response = await authService.registerUser(req.body); // {email, password}
    return res.status(200).json({ message: "Register successful:", response });
  } catch (error) {
    if (error.message === "Email error") {
      return res.status(404).send(error.message);
    }
    if (error.message === "Password error") {
      return res.status(404).send(error.message);
    }
    if (error.message === "Email duplicate Error") {
      return res.status(404).send(error.message);
    }
    return res.status(500).send(error);
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
  register,
  sendRecoveryEmail,
  resetPassword,
};

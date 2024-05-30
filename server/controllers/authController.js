const authService = require('../services/authService');

async function login(req, res) {
  try {
    const response = await authService.authenticateUser(req.body); // {email, password}
    return res.status(200).send({ message: "Login successful:", response });
  } catch (error) {
    if (error.message === "Incorrect Password") {
      return res.status(401).send({ message: error.message });
    }
    if (error.message === "Email not found") {
      return res.status(401).send({ message: error.message });
    }
    return res.sendStatus({ message: error.message });
  }
}

async function register(req, res) {
  try {
    const response = await authService.registerUser(req.body); // {email, password}
    return res.status(200).send({ message: "Register successful:", response });
  } catch (error) {
    if (error.message === "Email error") {
      return res.status(404).send({ message: error.message });
    }
    if (error.message === "Password error") {
      return res.status(404).send({ message: error.message });
    }
    if (error.message === "Email duplicate Error") {
      return res.status(404).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
}

async function sendRecoveryEmail(req, res) {
  try {
    await authService.sendRecoveryEmail(req.body); // {email}
    return res.status(200).send({ message: "Sending recovery email successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    await authService.resetPassword(req.body); // {url, password}
    return res.status(200).send({ message: "Sending recovery email successful" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
}

module.exports = {
  login,
  register,
  sendRecoveryEmail,
  resetPassword,
};

const { accessToken } = require('mapbox-gl');
const authService = require('../services/authService');

async function login(req, res) {
  var response = {}
  try {
    response = await authService.authenticateUser(req.cookies, req.body); // {cookies, {email, password} }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.cookie('jwt', response.refresh_token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 30 * 24 * 60 * 60 * 1000 }); // create a secure cookie with refresh token
    res.status(200).json({ message: "Login successful:", access_token: response.access_token });
    return;
  } catch (error) {
    if (error.message === "Incorrect Password") {
      return res.status(401).send({ message: error.message });
    }
    if (error.message === "Email not found") {
      return res.status(401).send({ message: error.message });
    }
    if (error.message === "Compromised Refresh Token") {
      return res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // clear cookie after being compromised
    }
    console.log(error)
    return res.status(500).send({ message: error.message });
  }
}

async function logout(req, res) {
  try {
    await authService.logoutUser(req.cookies);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
    return;
  } catch (error) {
    if (error.message === "No Content") {
      console.log("no content")
      return res.sendStatus(204);
    }
    if (error.message === "No User found") {
      console.log("no user found")
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      res.sendStatus(204);
    }
    return res.status(500).send({ message: error.message });
  }
}

async function register(req, res) {
  try {
    const response = await authService.registerUser(req.body); // {name, email, password}
    return res.status(201).send({ message: "Register successful:", response });
  } catch (error) {
    if (error.message === "Email error") {
      return res.status(400).send({ message: error.message });
    }
    if (error.message === "Password error") {
      return res.status(400).send({ message: error.message });
    }
    if (error.message === "Email duplicate Error") {
      return res.status(409).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
}

async function handleRefreshToken(req, res) {
  var response = {}
  try {
    response = await authService.handleRefreshToken(req.cookies);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }); // clear access token
    res.cookie('jwt', response.refresh_token, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000 }); // create a secure cookie with refresh token
    res.status(200).send({ message: "Handle refresh token successful", access_token: response.access_token });
    return;
  } catch (error) {
    if (error.message === "Unauthorized") {
      return res.status(401).send({ message: error.message });
    }
    if (error.message === "Forbidden") {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }); // clear access token
      res.status(403).send({ message: error.message });
      return;
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
  logout,
  register,
  handleRefreshToken,
  sendRecoveryEmail,
  resetPassword,
};

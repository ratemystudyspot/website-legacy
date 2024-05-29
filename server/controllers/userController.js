const userService = require('../services/userService');

async function getUsers(req, res) {
  try {
    const users = await userService.getUsers(req.query);
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createUser(req, res) {
  try {
    const response = await userService.createUser(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.sendStatus(404);
  }
}

async function updateUser(req, res) {
  try {
    const response = await userService.updateUser(req.body);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
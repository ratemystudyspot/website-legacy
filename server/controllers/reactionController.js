const reactionService = require('../services/reactionService');

async function getReactions(req, res) {
  try {
    const review = await reactionService.getReactions(req.query);
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createReaction(req, res) {
  try {
    const result = await reactionService.createReaction(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function updateReaction(req, res) {
  try {
    const result = await reactionService.updateReaction(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function deleteReaction(req, res) {
  try {
    await reactionService.deleteReaction(req.query);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getReactions,
  createReaction,
  updateReaction,
  deleteReaction,
};
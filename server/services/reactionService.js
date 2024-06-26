const reactionModel = require('../models/reactionModel');

async function getReactions(query) {
  try {
    return await reactionModel.findAll(query);
  } catch (error) {
    console.error("Error fetching reaction:", error);
    throw error;
  }
}

async function createReaction(body) {
  try {
    return await reactionModel.createReaction(body);
  } catch (error) {
    console.error("Error creating reaction:", error);
    throw error;
  }
}

async function updateReaction(body) {
  try {
    return await reactionModel.updateReaction(body);
  } catch (error) {
    console.error("Error updating reaction:", error);
    throw error;
  }
}

async function deleteReaction(query) {
  try {
    return await reactionModel.deleteReaction(query);
  } catch (error) {
    console.error("Error updating reaction:", error);
    throw error;
  }
}

module.exports = {
  getReactions,
  createReaction,
  updateReaction,
  deleteReaction,
};
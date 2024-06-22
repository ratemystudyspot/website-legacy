const reactionModel = require('../models/reactionModel');

async function getReactions(query) {
  try {
    return await reactionModel.findAll(query);
  } catch (error) {
    console.error("Error fetching reaction:", error);
    throw error;
  }
}

async function createReaction(query) {
  try {
    return await reactionModel.createReaction(query);
  } catch (error) {
    console.error("Error creating reaction:", error);
    throw error;
  }
}

async function updateReaction(query) {
  try {
    return await reactionModel.updateReaction(query);
  } catch (error) {
    console.error("Error updating reaction:", error);
    throw error;
  }
}

module.exports = {
  getReactions,
  createReaction,
  updateReaction,
};
const reviewModel = require('../models/reviewModel');

async function getReviews(query) {
  try {
    return await reviewModel.findAll(query);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

async function createReview(query) {
  try {
    return await reviewModel.createReview(query);
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}

async function updateReview(query) {
  try {
    return await reviewModel.updateReview(query);
  } catch (error) {
    console.error("Error updating reviews:", error);
    throw error;
  }
}

module.exports = {
  getReviews,
  createReview,
  updateReview,
};
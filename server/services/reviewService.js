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

async function updateReview(query, body) {
  try {
    const filters = { id: query.id, user_id: body.user_id }
    const foundReviews = reviewModel.findAll(filters);

    if (!foundReviews) throw new Error("Forbidden"); // user does not have access to edit given review

    return await reviewModel.updateReview(query, body);
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
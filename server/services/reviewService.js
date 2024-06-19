const reviewModel = require('../models/reviewModel');

async function getReviews(query) {
  try {
    return await reviewModel.findAll(query);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
}

module.exports = {
  getReviews,
};
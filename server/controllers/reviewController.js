const reviewService = require('../services/reviewService');

async function getReviews(req, res) {
  try {
    const review = await reviewService.getReviews(req.query);
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getReviews
};
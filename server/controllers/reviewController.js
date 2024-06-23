const reviewService = require('../services/reviewService');

async function getReviews(req, res) {
  try {
    const review = await reviewService.getReviews(req.query);
    res.status(200).send(review);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function createReview(req, res) {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function updateReview(req, res) {
  try {
    await reviewService.updateReview(req.query, req.body);
    res.sendStatus(204);
  } catch (error) {
    if (error.message === "Forbidden") {
      return res.status.send(error);
    }
    res.status(404).send(error);
  }
}

module.exports = {
  getReviews,
  createReview,
  updateReview,
};
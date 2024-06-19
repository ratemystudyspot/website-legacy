const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.get('/', reviewController.getReviews); // get reviews

module.exports = router;
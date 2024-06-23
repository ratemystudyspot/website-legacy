const express = require('express');
const reviewController = require('../controllers/reviewController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.get('/', reviewController.getReviews); // get reviews
router.post('/', verifyJWT, reviewController.createReview) // create a review
router.put('/', verifyJWT, reviewController.updateReview) // update a review

module.exports = router;
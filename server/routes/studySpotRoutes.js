const express = require('express');
const studySpotController = require('../controllers/studySpotController');
const router = express.Router();

router.get('/', studySpotController.getSpots); // get spots
router.get('/features', studySpotController.getSpotsByFeatures); // get spots by features
router.get('/time', studySpotController.getSpotsByTime); // get spots by opening hours

module.exports = router;
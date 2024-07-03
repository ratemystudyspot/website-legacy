const express = require('express');
const studySpotController = require('../controllers/studySpotController');
const router = express.Router();

router.get('/', studySpotController.getSpots); // get spots
router.get('/features', studySpotController.getSpotsByFeatures); // get spots by features
router.get('/time', studySpotController.getSpotsByTime); // get spots by opening hours
router.get('/count', studySpotController.countSpots); // count total spots

module.exports = router;
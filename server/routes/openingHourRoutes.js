const express = require('express');
const openingHourController = require('../controllers/openingHourController.js');
const router = express.Router();

router.get('/', openingHourController.getOpeningHourById); // get opening hours by study spot id

module.exports = router;
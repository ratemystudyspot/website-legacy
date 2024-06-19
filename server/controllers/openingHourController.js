const openingHourService = require('../services/openingHourService');

async function getOpeningHourById(req, res) {
  try {
    const openingHour = await openingHourService.getOpeningHourById(req.query);
    res.status(200).send(openingHour);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getOpeningHourById,
};
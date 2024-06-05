const studySpotService = require('../services/studySpotService');

async function getSpots(req, res) {
  try {
    const users = await studySpotService.getSpots(req.query);
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getSpotsByFeatures(req, res) {
  try {
    const users = await studySpotService.getSpotsByFeatures(req.query);
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getSpots,
  getSpotsByFeatures,
};
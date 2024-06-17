const studySpotService = require('../services/studySpotService');

async function getSpots(req, res) {
  try {
    const studySpot = await studySpotService.getSpots(req.query);
    res.status(200).send(studySpot);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getSpotsByFeatures(req, res) {
  try {
    const studySpot = await studySpotService.getSpotsByFeatures(req.query);
    res.status(200).send(studySpot);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getSpotsByTime(req, res) {
  try {
    const studySpot = await studySpotService.getSpotsByTime(req.query);
    res.status(200).send(studySpot);
  } catch (error) {
    res.status(404).send(error);
  }
}

async function getOpeningHourById(req, res) {
  try {
    const openingHour = await studySpotService.getOpeningHourById(req.query);
    res.status(200).send(openingHour);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  getSpots,
  getSpotsByFeatures,
  getSpotsByTime,
  getOpeningHourById
};
const studySpotModel = require('../models/studySpotModel');

async function getSpots(filters) {
  try {
    return await studySpotModel.findAll(filters);
  } catch (error) {
    console.error("Error fetching spots:", error);
    throw error;
  }
}

async function getSpotsByFeatures(features) {
  try {
    return await studySpotModel.findAllByFeatures(features);
  } catch (error) {
    console.error("Error fetching spots:", error);
    throw error;
  }
}

async function getSpotsByTime(filters) {
  try {
    return await studySpotModel.findAllByTime(filters);
  } catch (error) {
    throw error;
  }
}

async function getOpeningHourById(query) {
  try {
    return await studySpotModel.findAllOpeningHour(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getSpots,
  getSpotsByFeatures,
  getSpotsByTime,
  getOpeningHourById,
}
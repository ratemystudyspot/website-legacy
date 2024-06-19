const openingHourModel = require('../models/openingHourModel');

async function getOpeningHourById(query) {
  try {
    return await openingHourModel.findAllOpeningHour(query);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOpeningHourById,
};
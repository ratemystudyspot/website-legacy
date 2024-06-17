import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_STUDYSPOT || 'http://localhost:3001/api/studyspot';

async function getSpots() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getSpotsByFeatures(features) {
  try {
    const response = await axios.get(`${API_URL}/features/?features=${features}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getSpotsByTime(time) {
  try {
    const response = await axios.get(`${API_URL}/time/?time=${time}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getOpeningHourById(study_spot_id) {
  try {
    const response = await axios.get(`${API_URL}/openinghour/?study_spot_id=${study_spot_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getSpots,
  getSpotsByFeatures,
  getSpotsByTime,
  getOpeningHourById,
}
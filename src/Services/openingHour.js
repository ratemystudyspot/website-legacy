import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_OPENINGHOUR || 'http://localhost:3001/api/openinghour';

async function getOpeningHourById(study_spot_id) {
  try {
    const response = await axios.get(`${API_URL}?study_spot_id=${study_spot_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getOpeningHourById,
}
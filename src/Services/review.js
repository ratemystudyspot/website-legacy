import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_REVIEW || 'http://localhost:3001/api/review';

async function getReviews() {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getReviews,
}
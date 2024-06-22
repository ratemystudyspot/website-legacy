import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_REVIEW || 'http://localhost:3001/api/review';

async function getReviewsByUser(user_id) {
  try {
    const response = await axios.get(`${API_URL}?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getReviewsByStudySpot(study_spot_id) {
  try {
    const response = await axios.get(`${API_URL}?study_spot_id=${study_spot_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function createReview(user_id, study_spot_id, rating, comment) {
  try {
    const response = await axios.post(`${API_URL}`, {user_id, study_spot_id, rating, comment});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function editReview(id, user_id, study_spot_id, comment, rating) {
  try {
    const response = await axios.put(`${API_URL}/${id}`, {user_id, study_spot_id, comment, rating});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getReviewsByUser,
  getReviewsByStudySpot,
  createReview,
  editReview,
}
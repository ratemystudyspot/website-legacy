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

async function createReview(user_id, study_spot_id, overall_rating, rating_body, comment, access_token) {
  try {
    const new_rating_body = {};
    for (const key in rating_body) {
      new_rating_body[key] = rating_body[key];
    }
    const response = await axios.post(`${API_URL}`,
      { user_id, study_spot_id, overall_rating, ...new_rating_body, comment },
      { headers: { Authorization: `Bearer ${access_token}` } });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function editReview(id, user_id, overall_rating, rating_body, comment, access_token) {
  try {
    const new_rating_body = {};
    for (const key in rating_body) {
      new_rating_body[key] = rating_body[key];
    }
    const response = await axios.put(`${API_URL}?id=${id}`,
      { user_id, overall_rating, ...new_rating_body, comment },
      { headers: { Authorization: `Bearer ${access_token}` } });
    return response.data;
  } catch (error) {
    throw error.response;
  }
}

export {
  getReviewsByUser,
  getReviewsByStudySpot,
  createReview,
  editReview,
}
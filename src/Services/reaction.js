import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_REACTION || 'http://localhost:3001/api/reaction';

async function getReactionsByUser(user_id) {
  try {
    const response = await axios.get(`${API_URL}?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function getReactionsByReview(review_id) {
  try {
    const response = await axios.get(`${API_URL}?review_id=${review_id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function createReaction(review_id, user_id, reaction) {
  try {
    const response = await axios.post(`${API_URL}`, { review_id, user_id, reaction });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

async function updateReaction() {
  try {
    const response = await axios.put(`${API_URL}`, {});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export {
  getReactionsByUser,
  getReactionsByReview,
  createReaction,
  updateReaction,
}
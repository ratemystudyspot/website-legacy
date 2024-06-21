import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_AUTH || 'http://localhost:3001/api/auth';

async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.log(error)
    throw error.response;
  }
}

async function logout() {
  try {
    const response = await axios.get(`${API_URL}/logout`);
    return response.data.response;
  } catch (error) {
    throw error.response.data;
  }
}

async function register(email, password) {
  try {
    await axios.post(`${API_URL}/register`, { email, password });
  } catch (error) {
    throw error.response.data;
  }
}

async function sendRecoveryEmail(email) {
  try {
    await axios.post(`${API_URL}/send-recovery-email`, { email });
  } catch (error) {
    console.error("Error sending recovery email:", error?.response);
  }
}

async function updatePassword(url, password) {
  try {
    await axios.put(`${API_URL}/reset-password`, { url, password });
  } catch (error) {
    console.error("Error updating password:", error?.response);
  }
}

export {
  login,
  logout,
  register,
  sendRecoveryEmail,
  updatePassword,
  // reset,
}
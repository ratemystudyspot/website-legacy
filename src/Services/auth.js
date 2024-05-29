import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_AUTH || 'http://localhost:3001/api/auth';

async function login(email, password) {
  try {
    await axios.post(`${API_URL}/login`, { email, password });
  } catch (error) {
    console.error('Error authenticating user:', error);
  }
}

async function sendRecoveryEmail(email) {
  try {
    await axios.post(`${API_URL}/send-recovery-email`, { email });
  } catch (error) {
    console.error("Error sending recovery email:", error);
  }
}

async function updatePassword(url, password) {
  try {
    await axios.post(`${API_URL}/update-password`, { url, password });
  } catch (error) {
    console.error("Error updating password:", error);
  }
}

export {
  login,
  sendRecoveryEmail,
  reset
}
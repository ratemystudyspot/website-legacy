// ignore this file... saved for future use
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_USER || 'http://localhost:3001/api/user';

// sends email to specified email (potentially remove and put to new file later)
async function sendEmail(email, link) {
  try {
    return await axios.post(`${API_URL}/`, { email, link });
  } catch (error) {
    console.error('Error sending email: ', error);
  }
}

export {
  sendEmail,
}
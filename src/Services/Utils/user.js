import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_USER || 'http://localhost:3001/api/user';

// get user from the database
async function getUsers() {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error(error);
  }
}

// creates new user record
async function createUser(email, password) {
  try {
    return await axios.post(API_URL, {
      email,
      password,
      role: 2004,
    });
  } catch (error) {
    console.error(error);
  }
}

// updates a user record
// param: user_body must include id
async function updateUser(user_body) {
  try {
    return await axios.put(API_URL, user_body);
  } catch (error) {
    console.error('Error updating user: ', error);
  }
}

// deletes a user record
// param: user_body must include id
async function deleteUser(user_body) {
  try {
    return await axios.delete(API_URL, user_body)
  } catch (error) {
    console.error('Error deleting user data: ', error);
  }
}

export {
  getUsers,
  createUser,
  updateUser,
  deleteUser,  
};

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL_USER || 'http://localhost:3001/api/user';

// get user from the database
async function getUsers(access_token) {
  try {
    return await axios.get(API_URL,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    console.error(error);
  }
}

// TODO: will fix this to recieve only ONE user (currently gets an array of users that match a given id) + will need to change other code affected by this change
async function getUserByID(user_id, access_token) {
  try {
    return await axios.get(`${API_URL}?id=${user_id}`,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    console.error(error);
  }
}

// creates new user record
async function createUser(email, password, access_token) {
  try {
    return await axios.post(API_URL,
      {
        email,
        password,
        role: process.env.REACT_APP_USER_ROLE,
      },
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    console.error(error);
  }
}

// updates a user record
// param: user_body must include id
async function updateUser(user_body, access_token) {
  try {
    return await axios.put(API_URL,
      user_body,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
  } catch (error) {
    console.error('Error updating user: ', error);
  }
}

// deletes a user record
// param: user_body must include id
async function deleteUser(user_body, access_token) {
  try {
    return await axios.delete(API_URL,
      user_body,
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
  } catch (error) {
    console.error('Error deleting user data: ', error);
  }
}

export {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};

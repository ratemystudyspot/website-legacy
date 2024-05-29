const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function getUsers(filters) {
  try {
    return await User.findAll(filters);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUser(body) {
  const { email, password, role } = body;

  // checking for uniqueness of email
  try {
    const users = await User.findAll({ email: email.lowercase() });
    if (users.length != 0) { // if email exists, then not unique, then stop creating new user
      console.error("Error: Email not unique");
      throw new Error("Email not unique");
    }
  } catch (error) {
    throw error;
  }

  // salting and hashing password
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(password, salt);
  } catch (error) {
    console.log("Error salting and hashing:", error);
    throw error;
  }

  // creating a new user
  try {
    return await User.createUser({ email, password: hash_password, role });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// update user to the given attributes
async function updateUser(body) {
  // if no id provided, throw error
  if (!body.id) {
    console.error("Error: No ID provided");
    throw new Error("Error No ID");
  }

  // salting and hashing password ONLY IF NEEDED
  if (body.password) {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash_password = bcrypt.hashSync(password, salt);
      body.password = hash_password;
    } catch (error) {
      console.log("Error salting and hashing:", error);
      throw error;
    }
  }

  // updating the user
  try {
    return await User.updateUser(body.id, body);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// deleting a user
async function deleteUser(body) {
  if (!body.id) {
    console.error("Error: No ID provided");
    throw new Error("Error No ID");
  }

  try {
    await User.deleteUser(body.id);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }

}


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
}
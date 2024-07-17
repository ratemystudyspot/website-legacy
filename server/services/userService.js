const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function getUsers(filters) {
  try {
    return await User.findAllSafe(filters);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

async function createUser(body) {
  const { email, password, role } = body;

  // checking for uniqueness of email
  try {
    const users = await User.findAllSafe({ email: email.lowercase() });
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
    return await User.createUser({ 
      hashed_id: uuidv4(),
      email, 
      password: hash_password, 
      role
    });
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
  const id = body.id
  delete body["id"]; // prevents updating id

  // salting and hashing password, old_password to confirm identification, new_password to change to
  if (body.old_password && body.new_password) {
    try {
      const user = await User.findOne({ id });
      if (!await bcrypt.compare(body.old_password, user.password)) throw new Error('Incorrect Password'); // if hashed password and given password don't match, throw error
      body.password = await bcrypt.hash(body.new_password, 15) // set body.password to auto-gen salt and hash
      delete body["old_password"]; // db only has "password" column
      delete body["new_password"];
    } catch (error) {
      console.log("Error updating password:", error);
      throw error;
    }
  }

  // updating the user
  try {
    return await User.updateUser(id, body);
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
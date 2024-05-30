const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const tokenUtil = require('../utils/token');
const emailUtil = require('../utils/email');

const WEB_APP_URL = process.env.WEB_APP_URL || "http://localhost:3000";

// checks if the given credentials match a user in the database
// param 1: pass in the user's email
// param 2: pass in the user's password
// return: void or error
async function authenticateUser(credentials) {
  const email = credentials.email.toLowerCase();
  const password = credentials.password;

  try {
    const user = await User.findAll({ email });
    const user_data = user[0]?.dataValues;

    if (!user_data) throw new Error("Email not found");
    if (!bcrypt.compareSync(password, user_data?.password)) throw new Error('Incorrect Password'); // if hashed password and given password don't match, throw error
    const safe_user_data = { email: user_data.email, role: user_data.role };
    return safe_user_data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function registerUser(credentials) {
  const email = credentials.email.toLowerCase();
  const password = credentials.password; //check later
  const role = process.env.USER_ROLE || 2004;

  try {
    const EMAIL_REGEX =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const PWD_REGEX = /.{8,}/;
    if (!EMAIL_REGEX.test(email)) throw new Error('Email error');
    if (!PWD_REGEX.test(password)) throw new Error('Password error');
  } catch (error) {
    console.error("Error passing credential requirements:", error);
    throw error;
  }

  // checking for uniqueness of email
  try {
    const users = await User.findAll({ email });
    if (users.length != 0) { // if email exists, then not unique, then stop creating new user
      console.error("Error: Email duplicate Error");
      throw new Error("Email duplicate Error");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }

  // salting and hashing password
  try {
    // var salt = bcrypt.genSaltSync(10);
    var hash_password = bcrypt.hashSync(password, 10);
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

async function sendRecoveryEmail(body) {
  const { email } = body;
  const user = await User.findAll({ email });
  const user_data = user[0]?.dataValues;
  const email_info = { email, password_recovery_token: '' };

  // generate password recovery token and store in user's data
  try {
    const password_recovery_token = await tokenUtil.generateRandomToken();
    await User.updateUser(user_data.id, { password_recovery_token });
    email_info.link = `${WEB_APP_URL}/password/${password_recovery_token}`;
  } catch (error) {
    console.error("Error generating and storing Password Recovery Token:", error.message);
    throw error;
  }

  // send the email with the URL to reset password
  try {
    await emailUtil.sendEmail(email_info);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

async function resetPassword(body) {
  const { url, password } = body;
  const password_recovery_token = url.split('/').pop();
  const user = await User.findAll({ password_recovery_token }); // retrieve user info
  const user_data = user[0]?.dataValues;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    await User.updateUser(user_data.id, { password: hash_password });
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

module.exports = {
  authenticateUser,
  registerUser,
  sendRecoveryEmail,
  resetPassword,
};
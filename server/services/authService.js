const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const tokenUtil = require('../utils/token');
const emailUtil = require('../utils/email');

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /.{8,}/;

// checks if the given credentials match a user in the database
// param 1: pass in the user's email
// param 2: pass in the user's password
// return: void or error
async function authenticateUser(credentials) {
  const { email, pwd } = credentials;
  email = email.lowercase();
  try {
    const result = await getUsersByEmail(email);
    const parsed_result = JSON.parse(result);

    if (!bcrypt.compareSync(pwd, parsed_result.password)) throw new Error('Incorrect Password'); // if hashed password and given password don't match, throw error
    return parsed_result;
  } catch (error) {
    if (error.message === "Incorrect Password") {
      throw new Error('Incorrect Password');
    } else if (error.message === "Unauthorized") {
      throw new Error('Email not found in system');
    } else {
      console.error('Error fetching user data: ', error);
    }
  }
}

async function sendRecoveryEmail(body) {
  const { email } = body;
  const user = await User.findAll({ email });
  const email_info = { email, password_recovery_token: '' };

  // generate password recovery token and store in user's data
  try {
    const password_recovery_token = await tokenUtil.generateToken();
    await User.updateUser(user.id, { password_recovery_token });
    email_info.password_recovery_token = password_recovery_token;
  } catch (error) {
    console.error("Error generating and storing Password Recovery Token:", error);
    throw error;
  }

  // send the email with the URL to reset password
  try {
    await emailUtil.sendEmail(email_info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

async function resetPassword(body) {
  const { url, password } = body;
  const password_recovery_token = url.split('/').pop();
  const user = await User.findAll({ password_recovery_token }); // retrieve user info

  try {
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    await User.updateUser(user.id, { password: hash_password });
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

module.exports = {
  authenticateUser,
  sendRecoveryEmail,
  resetPassword,
};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findOne, findAllSafe } = require('../models/userModel');
const tokenUtil = require('../utils/token');
const emailUtil = require('../utils/email');
const validator = require('validator');

const WEB_APP_URL = process.env.WEB_APP_URL || "http://localhost:3000";

// checks if the given credentials match a user in the database
// param 1: pass in the user's email
// param 2: pass in the user's password
// return: void or error
async function authenticateUser(cookies, credentials) {
  // const email = validator.normalizeEmail(credentials.email);
  const email = credentials.email.toLowerCase();
  const password = validator.escape(credentials.password);
  console.log(`cookies available at login: ${JSON.stringify(cookies)}`);
  try {

    const user = await findOne({ email });

    if (!user) throw new Error("Email not found"); // if user not in db, throw error

    if (bcrypt.compareSync(password, user.password)) throw new Error('Incorrect Password'); // if hashed password and given password don't match, throw error

    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user.id,
          role: user.role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );

    // if no jwt in cookie, init to found refreshToken array in the DB
    // else if jwt in cookie, init to remove the jwt from the refreshToken array in the DB
    let newRefreshTokenArray =
      (!cookies?.jwt)
        ? user.refresh_token
        : user.refresh_token.filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await findOne({ refresh_token: refreshToken });

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!')
        newRefreshTokenArray = []; // clear out ALL previous refresh tokenss
      }

      // Saving refreshToken with current user
      user.refresh_token = [...newRefreshTokenArray, newRefreshToken];
      await user.save();
    }

    // Saving refreshToken with current user
    user.refresh_token = [...newRefreshTokenArray, newRefreshToken];
    await user.save();

    return { access_token: accessToken, refresh_token: newRefreshToken };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function logoutUser(cookies) {
  // TODO: on client, delete accessToken !!!
  if (!cookies?.jwt) throw new Error("No Content");
  const refreshToken = cookies.jwt;

  // is user in db?
  const user = await findOne({ refresh_token: refreshToken });
  if (!user) {
    throw new Error("No User found");
  }

  // delete refreshToken in DB
  user.refresh_token = user.refresh_token.filter(rt => rt !== refreshToken);
  await user.save();
}

async function registerUser(credentials) {
  const capitalize = (str) => { return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() };
  const [rawFirstName, rawLastName] = credentials.name.trim().split(/\s+/);

  if (
    !rawFirstName ||
    !rawLastName ||
    !validator.isAlpha(rawFirstName) ||
    !validator.isAlpha(rawLastName)
  ) throw new Error("Name error");

  const name = `${capitalize(rawFirstName)} ${capitalize(rawLastName)}`
  const email = credentials.email.toLowerCase();
  const password = credentials.password;

  try {
    const EMAIL_REGEX =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const PWD_REGEX = /.{8,}/;
    if (!EMAIL_REGEX.test(email) || !validator.isEmail(email))
      throw new Error('Email error');
    if (!PWD_REGEX.test(password) || validator.escape(password) !== password)
      throw new Error('Password error');
  } catch (error) {
    console.error("Error passing credential requirements:", error);
    throw error;
  }

  // checking for uniqueness of email
  try {
    const users = await findAllSafe({ email });
    if (users.length !== 0) { // if email exists, then not unique, then stop creating new user
      console.error("Error: Email duplicate Error");
      throw new Error("Email duplicate Error");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }


  // creating a new user
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return await createUser({
      name,
      email,
      password: hashedPassword, // auto-gen salt and hash
      role: process.env.REACT_APP_USER_ROLE
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

async function handleRefreshToken(cookies) {
  if (!cookies?.jwt) throw new Error("Unauthorized");
  const refreshToken = cookies.jwt;

  const user = await findOne({ refresh_token: refreshToken });

  // Detected refresh token reuse!
  if (!user) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      console.log('attempted refresh token reuse!') // debuggin purposes

      // find hacked user and clear all refresh tokens
      const hackedUser = await findOne({ id: decoded.id });
      hackedUser.refresh_token = [];
      await hackedUser.save();
    } catch (err) {
      throw new Error("Forbidden"); // 403
    }
  }

  const newRefreshTokenArray = user.refresh_token.filter(rt => rt !== refreshToken);

  // evaluate jwt 
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    if (user.id !== decoded.id) throw new Error("Forbidden"); // 403

    // Refresh token was still valid
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user.id,
          role: user.role
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );

    // Saving refreshToken with current user
    user.refresh_token = [...newRefreshTokenArray, newRefreshToken];
    await user.save();

    return { access_token: accessToken, refresh_token: newRefreshToken };
  } catch (err) {
    console.log('expired refresh token')
    user.refresh_token = [...newRefreshTokenArray];
    await user.save();

    throw new Error("Forbidden") // 403
  }
}

async function sendRecoveryEmail(body) {
  const email = validator.isEmail(body.email);
  const user = await findAllSafe({ email });
  const user_data = user[0]?.dataValues;
  const email_info = { email, password_recovery_token: '' };

  // generate password recovery token and store in user's data
  try {
    const password_recovery_token = await tokenUtil.generateRandomToken();
    await updateUser(user_data.id, { password_recovery_token });
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
  const user = await findAllSafe({ password_recovery_token }); // retrieve user info
  const user_data = user[0]?.dataValues;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    await updateUser(user_data.id, { password: hash_password });
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}

module.exports = {
  authenticateUser,
  logoutUser,
  registerUser,
  handleRefreshToken,
  sendRecoveryEmail,
  resetPassword,
};
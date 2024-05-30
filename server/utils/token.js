const { uuid } = require('uuidv4');

// generate token
// returns token or null
async function generateRandomToken() {
  try {
    const token = uuid(); // generate a random token string using the uuid library
    return token;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  generateRandomToken,
};
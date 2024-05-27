// !!! <-- indicates necessary changes before deployment
// ## <-- indicates immediate changes needed
const bcrypt = require('bcryptjs');

const EMAIL_REGEX =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PWD_REGEX = /.{8,}/;

// get user from the database
function getUser() {
  try {
    fetch('http://localhost:3001') // !!!
      .then(response => {
        return response.text();
      })
    // .then(data => {
    // console.log(data); for testing!
    // });
  } catch (error) {
    console.error('Error fetching user data: ', error);
  }
}

// get user with specified email from database
// param 1: email
// returns: 
function getUsersByEmail(email) {
  try {
    return fetch(`http://localhost:3001/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText); // create a new error with the status text
        }
        return response.text();
      })
      .then(data => {
        return data;
      })
  } catch (error) {
    console.error('Error fetching user data: ', error)
  }
}

function getUsersByURL(url) {
const parts = url.split('/');
const token = parts[parts.length - 1];
  try {
    return fetch(`http://localhost:3001/url/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText); // create a new error with the status text
        }
        return response.text();
      })
      .then(data => {
        return data;
      })
  } catch (error) {
    console.error('Error fetching user data: ', error)
  }
}

// creates new user record
// param 1: pass in the user's email (must be all lowercase)
// param 2: pass in the user's password
// return: void or error
async function createUser(email, pwd) {
  if (!EMAIL_REGEX.test(email)) throw new Error('Email error');
  if (!PWD_REGEX.test(pwd)) throw new Error('Password error');
  const role = 2004;
  try {
    await fetch('http://localhost:3001/users', { // !!! 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pwd, role }),
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error('Duplicate email error')
        }
        return response.text();
      })
      .then(data => {
        return data
      });
  } catch (error) {
    console.log(error)
    if (error.message === "Duplicate email error") {
      throw error;
    }
    console.error('Error creating user data: ', error);
  }
}

// checks if the given credentials match a user in the database
// param 1: pass in the user's email (must be all lowercase)
// param 2: pass in the user's password
// return: void or error
async function checkCredentials(email, pwd) {
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

// sends email to specified email (potentially remove and put to new file later)
function sendEmail(email, link) {
  try {
    fetch('http://localhost:3001/send-email', { // !!! 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, link }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        return data;
      });
  } catch (error) {
    console.error('Error creating user data: ', error);
  }
}

// resets password
async function putToken(email) {
  try {
    await fetch('http://localhost:3001/put-token', { // !!! 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        return data;
      });
  } catch (error) {
    console.error('Error putting token data: ', error);
  }
}

// deletes a user record
function deleteUser() {
  let id = prompt('Enter user\'s id');

  try {
    fetch(`http://localhost:3001/users/${id}`, { // !!!
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  } catch (error) {
    console.error('Error deleting user data: ', error);
  }

}

// updates a user record
function updateUser(user_body) {
  try {
    fetch(`http://localhost:3001/users/${user_body.id}`, { // !!!
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_body),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        return data;
      });
  } catch (error) {
    console.error('Error updating user: ', error);
  }

}

export {
  getUser,
  getUsersByEmail,
  getUsersByURL,
  createUser,
  checkCredentials,
  sendEmail,
  putToken,
  deleteUser,
  updateUser,
};

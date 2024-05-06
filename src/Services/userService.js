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

// creates new user record
// param 1: pass in the user's email
// param 2: pass in the user's password 
function createUser(email, pwd) {
  if (!EMAIL_REGEX.test(email)) throw new Error('Email error.');
  if (!PWD_REGEX.test(pwd)) throw new Error('Password error.');
  
  try {
    fetch('http://localhost:3001/users', { // !!! 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, pwd }),
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
function updateUser() {
  let id = prompt('Enter user\'s id');
  let name = prompt('Enter new user\'s name');
  let email = prompt('Enter new user\'s email');

  try {
    fetch(`http://localhost:3001/users/${id}`, { // !!!
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUser();
      });
  } catch (error) {
    console.error('Error updating user: ', error);
  }

}

export { getUser, createUser, deleteUser, updateUser };
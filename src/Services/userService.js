// !!! <-- indicates necessary changes before deployment
// ## <-- indicates immediate changes needed

// get user from the database
async function getUser() {
  try {
    await fetch('https://localhost:3001') // !!!
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
      })
  } catch (error) {
    console.error('Error fetching user data: ', error);
  }
}
// creates new user record
async function createUser() {
  let name = prompt('Enter user\'s name'); // ##
  let email = prompt('Enter user\'s email'); // ## (need to have email regex)

  try {
    await fetch('http://localhost:3001/users', { // !!! 
      method: 'POST',
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
    console.error('Error creating user data: ', error);
  }
  
}
// deletes a user record
async function deleteUser() {
  let id = prompt('Enter user\'s id');

  try {
    await fetch(`http://localhost:3001/users/${id}`, { // !!!
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
async function updateUser() {
  let id = prompt('Enter user\'s id');
  let name = prompt('Enter new user\'s name');
  let email = prompt('Enter new user\'s email');

  try {
    await fetch(`http://localhost:3001/users/${id}`, { // !!!
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
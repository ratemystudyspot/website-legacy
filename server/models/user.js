const Pool = require('pg').Pool
const bcrypt = require('bcryptjs');

// temp!! (don't put credentials in code)
const pool = new Pool({
	user: 'my_user',
	host: 'localhost',
	database: 'seeker',
	password: 'root',
	port: 5432,
});

// get all users in database
const getUsers = async () => {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT * FROM users", (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error("No results found"));
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Internal server error");
	}
};

// get a user by email in database
const getUsersByEmail = async (email) => {
	try {
    return await new Promise(function (resolve, reject) {
      pool.query("SELECT * FROM users WHERE email = $1", 
			[email],
			(error, results) => {
        if (error) {
          reject(error);
        }
        if (results && results.rows && results.rows.length > 0) {
					resolve(results.rows[0]);
        } else { // throw email not found error if email isn't found
          reject(new Error("Email not found in system"));
        }
      });
    });
  } catch (error) {
		if (error.message === "Email not found in system") {
			throw new Error("Email not found in system");
		} else {
			throw new Error("Internal server error");
		}
  }
};


// create a new user record in the databsse
const createUser = async (body) => {
	const { email, pwd, roles } = body;
		
	// check uniqueness of email by throwing error if found in database
	try {
    await getUsersByEmail(email);
    // If getUsersByEmail does not throw an error, it means email exists in the system and hence not unique
    throw new Error("Email found in system");
  } catch (error) {
    if (error.message === "Email not found in system") {
      // Email is not found, proceed with user creation
    } else {
      // Other errors, including "Email found in system", rethrow them to be handled by the caller
      throw error;
    }
  }

	// salt and hash passwords for security
	var salt = bcrypt.genSaltSync(10);
	var hash_pwd = bcrypt.hashSync(pwd, salt);
	
	return new Promise(function (resolve, reject) {
		pool.query(
			"INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
			[email, hash_pwd, roles],
			(error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(
						`A new user has been added: ${JSON.stringify(results.rows[0])}`
					);
				} else {
					reject(new Error("No results found"));
				}
			}
		);
	});
};

// delete a user record
const deleteUser = (id) => {
	return new Promise(function (resolve, reject) {
		pool.query(
			"DELETE FROM users WHERE id = $1",
			[id],
			(error, results) => {
				if (error) {
					reject(error);
				}
				resolve(`User deleted with ID: ${id}`);
			}
		);
	});
};
// update a user record
const updateUser = (id, body) => {
	return new Promise(function (resolve, reject) {
		const { email, pwd } = body;
		pool.query(
			"UPDATE users SET email = $1, pwd = $2 WHERE id = $3 RETURNING *",
			[email, pwd, id],
			(error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(`User updated: ${JSON.stringify(results.rows[0])}`);
				} else {
					reject(new Error("No results found"));
				}
			}
		);
	});
};
module.exports = {
	getUsers,
	getUsersByEmail,
	createUser,
	deleteUser,
	updateUser,
};
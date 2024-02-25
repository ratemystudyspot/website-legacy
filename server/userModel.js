const Pool = require('pg').Pool

// temp!! (don't put credentials in code)
const pool = new Pool({
	user: 'my_user',
	host: 'localhost',
	database: 'seeker',
	password: 'postgres',
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
	} catch (error_1) {
		console.error(error_1);
		throw new Error("Internal server error");
	}
};
// create a new user record in the databsse
const createUser = (body) => {
	return new Promise(function (resolve, reject) {
		const { name, email } = body;
		pool.query(
			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
			[name, email],
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
		const { name, email } = body;
		pool.query(
			"UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
			[name, email, id],
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
	createUser,
	deleteUser,
	updateUser
};
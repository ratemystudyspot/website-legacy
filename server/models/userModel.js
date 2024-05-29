const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");


// temp!! (don't put credentials in code)
// const pool = new Pool({
// 	user: 'my_user',
// 	host: 'localhost',
// 	database: 'seeker',
// 	password: 'root',
// 	port: 5432,
// });

// User model
const User = sequelize.define("User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		role: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},
		password_recovery_token: {
			type: DataTypes.TEXT,
		}
	},
	{
		timestamps: false,
		createdAt: false,
	}
);

// delete later
const test = () => {
	console.log(User === sequelize.models.User);
}

// get all users with the given filters
async function findAll(filters) {
	try {
		return await User.findAll({ where: filters });
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error(error.message);
	}
}

// create a new user record in the databsse
async function createUser(body) {
	try {
		return await User.create(body);
	} catch (error) {
		console.error("Error creating user:", error);
		throw new Error(error.message);
	}
};

// update a user record
async function updateUser(id, updated_attributes) {
	try {
		return await User.update(updated_attributes, { where: { id } });
	} catch (error) {
		console.error("Error updating user:", error);
		throw new Error(error.message);
	}
};

// delete a user record
async function deleteUser(id) {
	try {
		await User.destroy({ where: { id } });
	} catch (error) {
		console.error("Error deleting user:", error);
		throw new Error(error.message);
	}
};

// get a user by email in database
// const getUsersByEmail = async (email) => {

// get a user by url in database
// const getUsersByToken = async (token) => {





module.exports = {
	test,
	findAll,
	createUser,
	updateUser,
	deleteUser,
};
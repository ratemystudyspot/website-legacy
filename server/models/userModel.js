const { DataTypes, Op } = require('sequelize');
const { sequelize } = require("../config/db");
const validator = require('validator');

// User model
const User = sequelize.define("User", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
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
		defaultValue: 2001,
	},
	password_recovery_token: {
		type: DataTypes.TEXT,
	},
	refresh_token: {
		type: DataTypes.ARRAY(DataTypes.TEXT),
		defaultValue: []
	},
}, {
	timestamps: false,
	createdAt: false,
	tableName: "user"
}
);

// delete later
const test = () => {
	console.log(User === sequelize.models.User);
}

// get all users with the given filters (excluding certain info)
async function findAllSafe(filters) {
	try {
		for (const key in filters) { // security defense
			filters[key] = validator.escape(filters[key]);
			filters[key] = validator.trim(filters[key]);
		}

		return await User.findAll({
			attributes: { exclude: ['refresh_token', 'password_recovery_token', 'password'] },
			where: filters,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error(error.message);
	}
}

async function findOne(filters) {
	try {
		for (const key in filters) { // security defense
			filters[key] = validator.escape(filters[key]);
			filters[key] = validator.trim(filters[key]);

			if (key === 'refresh_token') {
				filters[key] = { [Op.contains]: [filters.refresh_token] };
			}
		}

		return await User.findOne({
			where: filters,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		throw new Error(error.message);
	}
}

// create a new user record in the databsse
async function createUser(body) {
	try {
		for (const key in body) {
			body[key] = validator.escape(body[key]);
			body[key] = validator.trim(body[key]);
		}

		return await User.create(body);
	} catch (error) {
		console.error("Error creating user:", error);
		throw new Error(error.message);
	}
};

// update a user record
async function updateUser(id, updated_attributes) {
	try {
		for (const key in updated_attributes) { // security defense
			updated_attributes[key] = validator.escape(updated_attributes[key]);
			updated_attributes[key] = validator.trim(updated_attributes[key]);
		}

		return await User.update(updated_attributes, { where: { id: parseInt(id) } });
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

module.exports = {
	User,
	test,
	findAllSafe,
	findOne,
	createUser,
	updateUser,
	deleteUser,
};
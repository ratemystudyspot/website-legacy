const { Op, DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");

// Studyspot model
const StudySpot = sequelize.define("StudySpot",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 404
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 404
		},
		location: {
			type: DataTypes.GEOMETRY('POINT', 4326), // Using PostGIS POINT type with SRID 4326
			allowNull: false,
			defaultValue: null
		},
		features: {
			type: DataTypes.ARRAY(DataTypes.TEXT), // Array of text for features
			allowNull: false,
			defaultValue: [] // Default value is an empty array
		},
		image_link: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: false,
		createdAt: false,
		tableName: "study_spot"
	}
);

// delete later
const test = () => {
	console.log(StudySpot === sequelize.models.StudySpot);
}

// get all spots with the given filters
async function findAll(filters) {
	try {
		return await StudySpot.findAll({ where: filters });
	} catch (error) {
		console.error("Error fetching spots:", error);
		throw new Error(error.message);
	}
}

// get all spots with the given feature names
async function findAllByFeatures(features) {
	try {
		return await StudySpot.findAll({
			where: {
				features: {
					[Op.contains]: features.features.split(',') // Filter study spots that contain all specified features
				}
			}
		});
	} catch (error) {
		console.log("MADE IT !!", features)
		console.error("Error fetching spots:", error);
		throw new Error(error.message);
	}
}

module.exports = {
	test,
	findAll,
	findAllByFeatures,
};
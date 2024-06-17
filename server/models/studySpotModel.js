const { Op, DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");

// Studyspot model
const StudySpot = sequelize.define("StudySpot", {
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
	image_links: {
		type: DataTypes.ARRAY(DataTypes.TEXT), // Array of text for features
		defaultValue: []
	},
},
	{
		timestamps: false,
		createdAt: false,
		tableName: "study_spot"
	}
);

const OpeningHour = sequelize.define('OpeningHour', {
	day_of_week: {
		type: DataTypes.STRING,
		allowNull: false
	},
	opening_time: {
		type: DataTypes.TIME,
		allowNull: true
	},
	closing_time: {
		type: DataTypes.TIME,
		allowNull: true
	}
},
	{
		timestamps: false,
		createdAt: false,
		tableName: "opening_hour"
	}
);

StudySpot.hasMany(OpeningHour, { foreignKey: 'study_spot_id' });
OpeningHour.belongsTo(StudySpot, { foreignKey: 'study_spot_id' });

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
		console.error("Error fetching spots:", error);
		throw new Error(error.message);
	}
}

async function findAllByTime(filters) {
	try {
		const timeFilters = {};
		if (filters.time) { // given a time, find all study spots that are open
			timeFilters.day_of_week = { [Op.eq]: filters.day_of_week }
			timeFilters.opening_time = { [Op.lte]: filters.time };
			timeFilters.closing_time = { [Op.gte]: filters.time };
		}
		return await StudySpot.findAll({
			include: [{
				model: OpeningHour,
				where: {
					...timeFilters,
				}
			}]
		});
	} catch (error) {
		console.error("Error fetching spots:", error);
		throw new Error(error.message);
	}
}

async function findAllOpeningHour(query) {
	try {
		const study_spot_id = query.study_spot_id;

		const openingHours = await OpeningHour.findAll({
			where: {
				study_spot_id: study_spot_id,
			},
			order: [
				[sequelize.literal(`
								CASE 
										WHEN day_of_week = 'Monday' THEN 1
										WHEN day_of_week = 'Tuesday' THEN 2
										WHEN day_of_week = 'Wednesday' THEN 3
										WHEN day_of_week = 'Thursday' THEN 4
										WHEN day_of_week = 'Friday' THEN 5
										WHEN day_of_week = 'Saturday' THEN 6
										WHEN day_of_week = 'Sunday' THEN 7
								END
						`), 'ASC']
			]
		});

		if (!openingHours.length) {
			return { message: "No opening hours found for this study spot." };
		}

		return openingHours.map(time => ({
			day_of_week: time.day_of_week,
			opening_time: time.opening_time,
			closing_time: time.closing_time
		}));
	} catch (error) {
		console.error("Error fetching opening hours:", error);
		throw new Error(error.message);
	}
}

module.exports = {
	test,
	findAll,
	findAllByFeatures,
	findAllByTime,
	findAllOpeningHour,
};
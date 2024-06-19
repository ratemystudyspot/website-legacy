const { Op, DataTypes } = require('sequelize');
const { sequelize } = require("../config/db");

const OpeningHour = sequelize.define('OpeningHour', {
	id: {
		type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
	},
	study_spot_id: {
		type: DataTypes.INTEGER,
		references: {
			model: 'user',
			key: 'id'
		},
		onDelete: 'CASCADE'
	},
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
  OpeningHour,
  findAllOpeningHour,
}
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./userModel');
const { StudySpot } = require('./studySpotModel');

// Review model
const Review = sequelize.define("Review", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  study_spot_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'study_spot',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},
  {
    timestamps: false,
    tableName: 'review',
  }
);

User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
StudySpot.hasMany(Review, { foreignKey: 'study_spot_id', onDelete: 'CASCADE' });
Review.belongsTo(StudySpot, { foreignKey: 'study_spot_id', onDelete: 'CASCADE' });

async function findAll(query) {
  try {
    const filters = {}
    if (query.user_id) filters.user_id = query.user_id;
    if (query.study_spot_id) filters.study_spot_id = query.study_spot_id;
    
    console.log("here")
    return await Review.findAll({
      where: {
        ...filters
      }
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error(error.message);
  }
}

module.exports = {
  Review,
  findAll,
}
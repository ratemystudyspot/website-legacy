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
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  study_spot_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'study_spot',
      key: 'id'
    }
  },
  overall_rating: {
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
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  quietness_rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  comfort_rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  space_rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
},
  {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'study_spot_id'],
      },
    ],
    timestamps: false,
    tableName: 'review',
  }
);

// a user has many reviews
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
// a study spot has many reviews
StudySpot.hasMany(Review, { foreignKey: 'study_spot_id', onDelete: 'CASCADE' });
Review.belongsTo(StudySpot, { foreignKey: 'study_spot_id', onDelete: 'CASCADE' });

async function findAll(query) {
  try {
    const filters = {}
    if (query.id) filters.id = query.id;
    if (query.user_id) filters.user_id = query.user_id;
    if (query.study_spot_id) filters.study_spot_id = query.study_spot_id;

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

async function createReview(query) {
  try {
    return await Review.create(query)
  } catch (error) {
    console.error("Error creating reviews:", error);
    throw new Error(error.message);
  }
}

async function updateReview(query, body) {
  try {
    if (!query.id) throw new Error("No id provided");

    const id = query.id;
    const updated_attributes = body;
    if (body.user_id) delete updated_attributes[body.user_id];

    return await Review.update(updated_attributes, { where: { id } });
  } catch (error) {
    console.error("Error updating reviews:", error);
    throw new Error(error.message);
  }
}

module.exports = {
  Review,
  findAll,
  createReview,
  updateReview,
}
// models/reaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { User } = require('./userModel');
const { Review } = require('./reviewModel');

const Reaction = sequelize.define('Reaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  review_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'review',
      key: 'id',
    },
  },
  reaction: {
    type: DataTypes.INTEGER,
    allowNull: false, // TRUE for like, FALSE for dislike
  },
},
  {
    indexes: [
      {
        unique: true,
        fields: ['user_id', 'review_id'],
      },
    ],
    timestamps: false,
    tableName: 'review',
  }
);

module.exports = Reaction;

// a user has many reactions
User.hasMany(Reaction, { foreignKey: 'user_id' });
Reaction.belongsTo(User, { foreignKey: 'user_id' });
// a review has many reactions
Review.hasMany(Reaction, { foreignKey: 'review_id' });
Reaction.belongsTo(Review, { foreignKey: 'review_id' });

async function findAll(query) {
  try {
    const filters = {}
    if (query.user_id) filters.user_id = query.user_id;
    if (query.review_id) filters.review_id = query.review_id;
    
    return await Review.findAll({
      where: {
        ...filters
      }
    });
  } catch (error) {
    console.error("Error fetching reactions:", error);
    throw new Error(error.message);
  }
}

// create a new user record in the databsse
async function createReaction(body) {
	try {
		return await Reaction.create(body);
	} catch (error) {
		console.error("Error creating reaction:", error);
		throw new Error(error.message);
	}
};

// update a user record
async function updateReaction(query) {
	try {
    if (!query.id) throw new Error("No id provided");

    const id = query.id;
    const updated_attributes = query;
    delete updated_attributes[id];

    return await Review.update(updated_attributes, { where: { id } });
  } catch (error) {
    console.error("Error updating reviews:", error);
    throw new Error(error.message);
  }
};
module.exports = {
	Reaction,
	findAll,
	createReaction,
  updateReaction, 
};
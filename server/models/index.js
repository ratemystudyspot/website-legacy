const sequelize = require('../database'); // Adjust the path to your sequelize instance
const User = require('./userModel');
const Review = require('./reviewModel');
const StudySpot = require('./studySpotModel');
const OpeningHour = require('./openingHourModel');

// Define associations
StudySpot.hasMany(OpeningHour, { foreignKey: 'study_spot_id' });
OpeningHour.belongsTo(StudySpot, { foreignKey: 'study_spot_id' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(StudySpot, { through: 'UserStudySpots' });
StudySpot.belongsToMany(User, { through: 'UserStudySpots' });

// Sync all models
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Error creating database:', error);
  });

module.exports = {
  User,
  Review,
  StudySpot
};

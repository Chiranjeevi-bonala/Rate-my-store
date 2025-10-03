const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  }
);

const User = require('./user')(sequelize);
const Store = require('./store')(sequelize);
const Rating = require('./rating')(sequelize);

User.hasMany(Store, { foreignKey: 'owner_id', as: 'stores' });
Store.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

User.hasMany(Rating, { foreignKey: 'user_id', as: 'ratings' });
Store.hasMany(Rating, { foreignKey: 'store_id', as: 'ratings' });
Rating.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Rating.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

module.exports = sequelize;
module.exports.User = User;
module.exports.Store = Store;
module.exports.Rating = Rating;

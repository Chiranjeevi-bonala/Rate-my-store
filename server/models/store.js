const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('Store', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: { len: [1, 60] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: { len: [1, 400] },
    },
  });

const { DataTypes } = require('sequelize');
module.exports = (sequelize) =>
  sequelize.define('User', {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: { len: [20, 60] },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    address: {
      type: DataTypes.STRING(400),
      allowNull: false,
      validate: { len: [1, 400] },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'owner'),
      defaultValue: 'user',
      allowNull: false,
    },
  });

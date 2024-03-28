const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
	'users',
	{
		UserID: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		FirstName: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		LastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		Email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true
		},
		Password: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		DOB: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		Avatar: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		Visible: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			allowNull: false,
		},
		CreatedAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},
	},
	{
		indexes: [
			// Create a unique index on Email
			{
				unique: true,
				fields: ['Email'],
			},
    ],
    timestamps: false
	}
);

module.exports = User;
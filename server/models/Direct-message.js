const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DirectMessage extends Model {}

DirectMessage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        message_content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'directmessage',
    }
);

module.exports = DirectMessage;

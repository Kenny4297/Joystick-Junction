const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        game_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM,
            values: ['Strategy and Tips', 'Reviews and Opinions', 'Bugs and Glitches', 'Updates, Patches, and DLC’s', 'Meet ups'],
            allowNull: false,
        },
        post_date: {
            type: DataTypes.STRING,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post;

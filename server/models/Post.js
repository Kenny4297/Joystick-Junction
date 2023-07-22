const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

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
            allowNull: true,
            references: {
                model: "user",
                key: "id",
                onDelete: "SET NULL",
            },
        },
        game_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM,
            values: ["Strategy-and-Tips", "Reviews-and-Opinions", "Bugs-and-Glitches", "Updates-Patches-DLCs", "Meetups"],
            allowNull: false,
        },
        post_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        post_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

module.exports = Post;

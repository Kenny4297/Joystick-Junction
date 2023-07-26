const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
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
                model: "User",
                key: "id",
                onDelete: "SET NULL",
            },
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: "cascade",
            references: {
                model: "Post",
                key: "id",
            },
        },
        comment_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        comment_content: {
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
        modelName: "Comment",
    }
);

module.exports = Comment;

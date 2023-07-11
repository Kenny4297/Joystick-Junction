const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Like extends Model {}

Like.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,  
      references: {
        model: 'Comment',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'like',
    validate: {
      eitherPostOrComment() {
        if (!(this.post_id || this.comment_id)) {
          throw new Error('A like must be associated with either a post or a comment.');
        }
        if (this.post_id && this.comment_id) {
          throw new Error('A like cannot be associated with both a post and a comment.');
        }
      }
    },
  }
);

module.exports = Like;

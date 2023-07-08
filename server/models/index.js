const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const DirectMessage = require('./Direct-message'); 

//Associations

//COMMENTS
Comment.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    as: 'post',
    foreignKey: 'post_id'
});

//POSTS
Post.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'post_id'
});

//USERS
User.hasMany(Comment, {
    as: 'comments',
    foreignKey: 'user_id'
});
User.hasMany(Post, {
    as: 'posts',
    foreignKey: 'user_id'
});
User.hasMany(DirectMessage, {
    as: 'sentDirectMessages',
    foreignKey: 'sender_id'
});
User.hasMany(DirectMessage, {
    as: 'receivedDirectMessages',
    foreignKey: 'recipient_id'
});

//DIRECT MESSAGES
DirectMessage.belongsTo(User, {
    as: 'sender',
    foreignKey: 'sender_id'
});
DirectMessage.belongsTo(User, {
    as: 'recipient',
    foreignKey: 'recipient_id'
});


module.exports = { Comment, Post, User, DirectMessage };

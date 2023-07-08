const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');
const DirectMessage = require('./Direct-message'); 

//Associations

//COMMENTS
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//POSTS
Post.belongsTo(User);
Post.hasMany(Comment);

//USERS
User.hasMany(Comment);
User.hasMany(Post);
User.hasMany(DirectMessage, {
    foreignKey: 'sender_id'
}); // Associate User with sent DMs
User.hasMany(DirectMessage, {
    foreignKey: 'recipient_id'
}); // Associate User with received DMs

//DIRECT MESSAGES
DirectMessage.belongsTo(User, {
    foreignKey: 'sender_id'
}); // Associate DM with sender
DirectMessage.belongsTo(User, {
    foreignKey: 'recipient_id'
}); // Associate DM with recipient

module.exports = { Comment, Post, User, DirectMessage }; // Export new model

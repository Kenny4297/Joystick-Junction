const { User, Post, Comment, DirectMessage, Like } = require('./models');

const syncOptions = { force: false };

User.sync(syncOptions)
.then(() => Post.sync(syncOptions))
.then(() => Comment.sync(syncOptions))
.then(() => DirectMessage.sync(syncOptions))
.then(() => Like.sync(syncOptions))
.then(() => {
  console.log('Database synced successfully');
})
.catch((error) => {
  console.error('Unable to sync database:', error);
});
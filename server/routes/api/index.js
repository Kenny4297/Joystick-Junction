const router = require('express').Router();
const usersRoutes = require('./user-routes');
const commentsRoutes = require('./comments-routes');
const postsRoutes = require('./posts-routes');
const messageRoutes = require('./message-routes');
const likesRoutes = require('./like-routes');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);
router.use('/messages', messageRoutes);
router.use('/likes', likesRoutes);

module.exports = router;

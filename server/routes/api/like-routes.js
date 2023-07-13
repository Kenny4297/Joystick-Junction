const express = require('express');
const router = express.Router();

// Controllers
const { 
    getLikesForPost,
    createLikeForPost,
    deleteLikeForPost,
    getLikesForComment,
    createLikeForComment
} = require('../../controllers/like-controller');

// Routes
router.route('/posts/:postId')
    .get(getLikesForPost)
    .post(createLikeForPost)
    .delete(deleteLikeForPost);

router.route('/comments/:commentId')
    .get(getLikesForComment)
    .post(createLikeForComment);


module.exports = router;

const express = require('express');
const router = express.Router();

// Controllers
const { 
    getAllComments,
    createComment,
    likeComment, 
    unlikeComment
} = require('../../controllers/comment-controller');

// Routes
router.route('/comments/likes').post(likeComment).delete(unlikeComment);
router.route('/:postId').get(getAllComments);
router.route('/').post(createComment);

module.exports = router;
const express = require('express');
const router = express.Router();

// Controllers
const { 
    getAllComments,
    createComment
} = require('../../controllers/comment-controller');

// Routes
router.route('/').post(createComment);
router.route('/:postId').get(getAllComments);

module.exports = router;
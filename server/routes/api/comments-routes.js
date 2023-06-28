const express = require('express');
const router = express.Router();

// Controllers
const { 
    getAllComments,
    createComment
} = require('../../controllers/comment-controller');

// Routes
router.route('/').get(getAllComments).post(createComment);

module.exports = router;
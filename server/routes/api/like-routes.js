const express = require('express');
const router = express.Router();

const { createLike, deleteLike, getLikesForPost } = require('../../controllers/like-controller');

router.route('/posts/:postId').get(getLikesForPost)
router.route('/').post(createLike).delete(deleteLike);

module.exports = router;
const express = require('express');
const router = express.Router();

const { 
  getAllPosts,
  getPostById, 
  createPost, 
  updatePost,
  deletePost,
  getPostsByGameAndCategory 
} = require('../../controllers/post-controller');

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);
router.route('/game/:gameId/category/:category').get(getPostsByGameAndCategory); 

module.exports = router;

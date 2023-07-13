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
router.route('/game/:gameId/category/:category').get(getPostsByGameAndCategory); 
router.route('/:id').get(getPostById).put(updatePost).delete(deletePost);


module.exports = router;

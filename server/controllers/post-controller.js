const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like')

module.exports = {
    // Get all posts
    // GET api/posts/
    async getAllPosts(req, res) {
        console.log("get all posts function firing?")
        try {
            const getPostData = await Post.findAll({
                include: [
                    { model: User, as: 'user', attributes: ['username'] },
                    { model: Like, as: 'likes' },
                    { 
                        model: Comment, 
                        as: 'comments',
                        attributes: ['id', 'user_id', 'post_id', 'comment_date', 'comment_content'],
                        include: { 
                            model: User, 
                            as: 'user', 
                            attributes: ['username'] 
                        }
                    }
                ]
            });

            console.log(getPostData)

            if(!getPostData.length) {
                return res.json([]);
            }

            res.json(getPostData);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while retrieving posts'});
        }
    },
    

    // Get a specific post
    async getPostById(req, res) {
        try {
            const getSpecificPost = await Post.findOne({ where: { id: req.params.id }})

            if(!getSpecificPost) {
                return res.status(404).json({message: 'Post not found'});
            }

            res.json(getSpecificPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while retrieving the post'});
        }
    },

    // Create a post
   // POST api/posts/
    async createPost(req, res) {
        console.log("Create a post API function firing!")
        console.log(req.body);  

        try {
            const newPost = {
                game_id: req.body.game_id,
                category: req.body.category,
                post_date: req.body.post_date,
                post_title: req.body.post_title,
                post_content: req.body.post_content,
                user_id: req.body.user_id
            };

            const createdPostModel = await Post.create(newPost);
            const createdPost = createdPostModel.toJSON(); // convert to plain object

            const user = await User.findOne({ where: { id: req.body.user_id } });

            createdPost.user = user;

            res.status(201).json(createdPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while creating the post'});
        }
    },


    // Get posts by game id and category
    // GET api/posts/game/:gameId/category/:category
    async getPostsByGameAndCategory(req, res) {
        console.log("Get posts by category API function firing!")
        try {
            const postsData = await Post.findAll({
                where: {
                    game_id: req.params.gameId,
                    category: req.params.category,
                },
                include: [
                    { model: User, as: 'user', attributes: ['username', 'profileImage'] },
                    { model: Like, as: 'likes' },
                    { 
                        model: Comment,
                        as: 'comments', 
                        attributes: ['id', 'post_id', 'comment_date', 'comment_content'],
                        include: { 
                            model: User, 
                            as: 'user', 
                            attributes: ['username'] 
                        }
                    }
                ]
            });
            
            if(!postsData.length) {
                return res.status(200).json([]);
            }
    
            res.json(postsData);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while retrieving posts'});
        }
    },

    // Update a post
    async updatePost(req, res) {
        try {
            const postToUpdate = await Post.update({
                game_id: req.body.game_id,
                category: req.body.category,
                post_date: req.body.post_date,
                post_title: req.body.post_title,
                post_content: req.body.post_content
            }, { where: { id: req.params.id }});

            if(!postToUpdate) {
                return res.status(404).json({message: 'Post not found'});
            }

            res.json(postToUpdate);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while updating the post'});
        }
    },

    // Delete a post
    async deletePost(req, res) {
        try {
            const postToDelete = await Post.destroy({ where: { id: req.params.id }});

            if(!postToDelete) {
                return res.status(404).json({message: 'Post not found'});
            }

            res.json({message: 'Post deleted successfully'});
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while deleting the post'});
        }
    }
};

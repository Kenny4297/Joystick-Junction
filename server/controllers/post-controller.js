const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');

module.exports = {
    // Function to get all posts
    // api/posts/
    async getAllPosts(req, res) {
        console.log("/api/posts API function firing")
        try {
            const getPostData = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'user_id', 'post_id', 'comment_date', 'comment_content'], // Changed 'post_date' to 'comment_date'
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    }
                ]
            });
            
            console.log("Successfully retrieved all posts.");
            res.json(getPostData); // Send the retrieved posts data back to the client
        } catch (err) {
            console.log("Error fetching posts: ", err);
            res.status(500).json(err); // Send the error back to the client
        }
    },
    

    // Function to get a specific post
    async getPostById(req, res) {
        let postId = req.params.id;
        try {
            const getSpecificPost = await Post.findOne({ where: { id: postId }})
            if (!getSpecificPost) {
                res.status(404).send("Sorry, post was not found!")
            } else {
                res.json(getSpecificPost);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Function to create a post
    async createPost(req, res) {
        try {
            let newPost = {
                post_date: req.body.post_date,
                post_content: req.body.post_content,
                post_title: req.body.post_title,
                user_id: req.session.user_id
            };

            const createdPost = await Post.create(newPost);
            res.status(201).send(createdPost);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Function to update a post
    async updatePost(req, res) {
        let postId = req.params.id;

        try {
            const postToUpdate = await Post.update({
                post_title: req.body.post_title,
                post_content: req.body.post_content
            }, 
            { where: { id: postId }});

            if (!postToUpdate) {
                res.status(404).json({message: "Post not found!"});
                return;
            } else {
                res.status(204).send("Post updated successfully");
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Function to delete a post
    async deletePost(req, res) {
        let postId = parseInt(req.params.id);
        try {
            const postToDelete = await Post.destroy({ where: { id: postId }});

            if (!postToDelete) {
                res.status(404).send("Sorry, no post found!");
            } else {
                res.json(postToDelete);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

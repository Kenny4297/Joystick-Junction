const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    // Function to get all comments
    // api/comments/
    // GET /api/comments/:  postId
    async getAllComments (req, res) {
        try {
            const getAllComments = await Comment.findAll({
                where: { post_id: req.params.postId },
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Post,
                        attributes: ['id', 'user_id', 'post_title', 'post_content']
                    }
                ],
            });

            res.json(getAllComments);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Function to create a comment
    // POST /api/comments/:postId
    async createComment (req, res) {
        console.log("Create comment API function firing")
        console.log("Session:", req.session);
        console.log("User ID:", req.session.userId);  // this should log 1, as per your previous message
        if (req.session) {
            try {
                const createdComment = await Comment.create({
                    user_id: req.session.userId,  // this should be 1, as per your previous message
                    post_id: req.body.post_id,
                    comment_date: new Date().toISOString(), 
                    comment_content: req.body.comment_content
                });
    
                console.log("Created comment:", createdComment.toJSON()); // Add this line
    
                const user = await User.findByPk(req.session.userId); 
                createdComment.dataValues.user_name = user.user_name;
                res.json(createdComment);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        }
    }
    
};
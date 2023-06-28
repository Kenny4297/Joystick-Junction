const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    // Function to get all comments
    getAllComments: async (req, res) => {
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
    createComment: async (req, res) => {
        if (req.session) {
            try {
                const createdComment = await Comment.create({
                    user_id: req.session.user_id, 
                    post_id: req.body.post_id,
                    comment_date: new Date().toISOString(), 
                    comment_content: req.body.comment_content
                });

                const user = await User.findByPk(req.session.user_id);
                createdComment.dataValues.user_name = user.user_name;
                res.json(createdComment);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        }
    }
};
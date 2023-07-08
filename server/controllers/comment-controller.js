const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    async getAllComments (req, res) {
        try {
            const getAllComments = await Comment.findAll({
                where: { post_id: req.params.postId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['username'],
                    },
                    {
                        model: Post,
                        as: 'post',
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

    async createComment (req, res) {
        console.log("Create comment API function firing")
        console.log("Session:", req.session);
        console.log("User ID:", req.session.userId);  
        if (req.session) {
            try {
                const createdComment = await Comment.create({
                    user_id: req.session.userId,  
                    post_id: req.body.post_id,
                    comment_date: new Date().toISOString(), 
                    comment_content: req.body.comment_content
                });
    
                console.log("Created comment:", createdComment.toJSON()); 
    
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

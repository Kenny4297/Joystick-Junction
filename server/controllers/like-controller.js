const Like = require('../models/Like');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
    async createLike(req, res) {
        try {
            const createdLike = await Like.create({
                user_id: req.session.userId,  
                post_id: req.body.post_id,
            });
    
            res.json(createdLike);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteLike(req, res) {
        try {
            const deletedLike = await Like.destroy({
                where: {
                    user_id: req.session.userId,  
                    post_id: req.body.post_id,
                }
            });
    
            res.json(deletedLike);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};

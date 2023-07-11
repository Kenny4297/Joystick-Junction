const Like = require('../models/Like');
const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {

    // GET api/likes/posts/:postId
    async getLikesForPost(req, res) {
        console.log("getLikeForPost firing!")
        try {
            const postId = req.params.postId;
            const likes = await Like.findAll({
                where: {
                    post_id: postId,
                },
                include: [ User, Post ],
            });

            if (!likes) {
                return res.status(404).json({ message: "No likes found for this post." });
            }

            res.json(likes);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // POST api/likes/
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

    // DELETE api/likes/
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

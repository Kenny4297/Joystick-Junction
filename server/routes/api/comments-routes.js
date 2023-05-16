const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// The official route here: '/api/comments'

//Get all comments
router.get('/', async (req, res) => {
    try {
        let getAllComments = await Comment.findAll({
            where: { post_id: post.id },
            include: [
            //We know that we will need the user for each comment. 
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Post,
                attributes: ['id', 'user_id', 'post_title', 'post_content']
            }
        ],
        })
        res.json(getAllComments)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Create a comment
router.post('/', async (req, res) => {  
    //checking to see if the user is logged in. Only logged in users can make posts
    if (req.session) {
      try {
        let createdComment = await Comment.create({
          //Make sure you add in all the fields that are "allowNull: false" in the model
          user_id: req.session.user_id, 
          post_id: req.body.post_id,
          comment_date: new Date().toISOString(), 
          comment_content: req.body.comment_content
        });
        //We can also find out who is logged in by getting the user_id tied into the session
        const user = await User.findByPk(req.session.user_id);
        createdComment.dataValues.user_name = user.user_name;
        res.json(createdComment)
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }  
  });

module.exports = router;
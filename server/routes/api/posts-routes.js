const router = require('express').Router();
const { Post } = require('../../models');

//Get all posts
router.get('/', async (req, res) => {
    try {
        const getPostData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                //I want to view these specific columns
                attributes: ['id', 'user_id', 'post_id', 'post_date', 'post_content'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        });

        res.json(getPostData)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get a specific post
router.get('/:id' , async (req, res) => {
    let postId = req.params.id;
    try {
        const getSpecificPost = await Post.findOne({ where: { id: postId }})
        if (!getSpecificPost) {
            res.status(404).send("Sorry, post was not found!")
        } else {
            res.json(getSpecificPost)
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Create a post
router.post('/', async (req, res) => {
    try {
        //Remember to add all the columns that have the filed of "AllowNull: False" in the Model's columns!
        //Make sure they are written correctly. (You messed this up when you tried to create your backend first to match the 'invisible form fields'. They need to match the models columns, not the values in the input fields for the form!!!)
        let createPost = await Post.create({
            post_date: req.body.post_date,
            post_content: req.body.post_content,
            post_title: req.body.post_title,
            user_id: req.session.user_id
        })
        res.status(201).send(createPost)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

//Update a post
router.put('/:id', async (req, res) => {
    let postId = req.params.id;

    try {
        let postToUpdate = await Post.update({
            post_title: req.body.post_title,
            post_content: req.body.post_content
        }, 
        { where: { id: postId }})

        if (!postToUpdate) {
            res.status(404).json({message: "Post not found!"})
            return;
        } else {
            res.status(204).send("Post updated successfully")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete a post
router.delete('/:id', async (req, res) => {
    let postId = parseInt(req.params.id);
    try {
        let postToDelete = await Post.destroy({ where: { id: postId }});

        if (!postToDelete) {
            res.status(404).send("Sorry, no post found!")
        } else {
            res.json(postToDelete);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;

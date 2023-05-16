const { User } = require('../models');
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {

  async createUser({ body }, res) {
    const userToInsert = {email: body.email, password: body.password, username: body.username }
    const user = await User.create(userToInsert);
  
    console.log(user)
  
    if (!user) return res.status(400).json({ message: 'Unable to create user' });
    res.status(200).json({ _id: user._id, email: user.email, username: user.username });
  },


  async updateUser({ body, params }, res) {
    let userToUpdate = { email: body.email, username: body.username, location: body.location }
  
    if( body.password?.length ){
      userToUpdate = {...userToUpdate, password: body.password }
    }
  
    const user = await User.update(userToUpdate, {
      where: { id: params.id },
      returning: true
    });
  
    if (!user) return res.status(400).json({ message: 'Unable to update user' });
  
    res.status(200).json({ _id: user[0], username: user[1].username, location: user[1].location, email: user[1].email });
  },

  async authUser({ body }, res) {

    // Find the user by the email address
    const user = await User.findOne({
      email: body.email
    });

    if (!user) return res.status(400).json({ message: 'Unable to authenticate user' });

    // We want to verify the password & kick them out if it fails
    const isValid = await user.isValidPassword(body.password);
    if( !isValid ) return res.status(400).json({ message: 'Unable to authenticate user' });

    const token = jwt.sign({
      email: user.email,
      id: user._id
    }, process.env.JWT_SECRET)

    res.header("auth-token", token).json({ error: null, data: { user, token }})
  },


  async verifyUser(req, res){
    console.log("Verify test")
    const token = req.headers["auth-token"]
  
    if( !token ) return res.status(401).json({msg: "un-authorized"})
  
    console.log(token)
    console.log("JWT secret:", process.env.JWT_SECRET);
    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if( !isVerified ) return res.status(401).json({msg: "un-authorized"})
  
    const user = await User.findOne({ where: { id: isVerified.id } })
    if( !user ) return res.status(401).json({msg: "unauthorized"})
    
    return res.status(200).json({ _id: user.id, username: user.username, location: user.location, email: user.email })
  }

};
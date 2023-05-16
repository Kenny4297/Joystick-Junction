const { User } = require('../models');
const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = {

  async createUser({ body }, res) {
    const userToInsert = {email: body.email, password: body.password, username: body.username }
    const user = await User.create(userToInsert);
  
    console.log(user)
  
    if (!user) return res.status(400).json({ message: 'Unable to create user' });
    res.status(200).json({ id: user.id, email: user.email, username: user.username });
  },


  async updateUser({ body, params }, res) {
    let userToUpdate = { email: body.email, username: body.username}
  
    if( body.password?.length ){
      userToUpdate = {...userToUpdate, password: body.password }
    }
  
    const user = await User.update(userToUpdate, {
      where: { id: params.id },
      returning: true
    });
  
    if (!user) return res.status(400).json({ message: 'Unable to update user' });
  
    res.status(200).json({ id: user[0], username: user[1].username, email: user[1].email });
  },

  async authUser({ body }, res) {

    // Find the user by the email address
    const user = await User.findOne({
      where: {
        email: body.email
      }
    });

    if (!user) return res.status(400).json({ message: 'Unable to authenticate user' });

    // We want to verify the password & kick them out if it fails
    const isValid = await user.isValidPassword(body.password);
    if( !isValid ) return res.status(400).json({ message: 'Unable to authenticate user' });

    console.log(user)
    const token = jwt.sign({
      email: user.email,
      id: user.id
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
  
    // Check if id is undefined before trying to find the user
    if (isVerified.id === undefined) return res.status(401).json({msg: "unauthorized"})
  
    const user = await User.findOne({ where: { id: isVerified.id } })
    if( !user ) return res.status(401).json({msg: "unauthorized"})
    
    return res.status(200).json({ id: user.id, username: user.username, email: user.email })
  }
  

};
const { Message } = require('../models');
require("dotenv").config();


module.exports = {
    // POST: /api/messages/
    async createMessage(req, res) {
        const { body } = req;
        const message = await Message.create({
        senderId: req.session.userId,
        receiverId: body.receiverId,
        message: body.message,
        });
        if (!message) return res.status(400).json({ message: 'Unable to send message' });
        res.status(200).json(message);
    },
    
    // GET: /api/messages/:userId
    async getMessagesByUserId(req, res) {
        const { userId } = req.params;
        const messages = await Message.findAll({
        where: { receiverId: userId },
        include: [{ model: User, as: 'sender' }],
        });
        if (!messages) return res.status(404).json({ message: 'Messages not found' });
        res.status(200).json(messages);
    }
}
const { DirectMessage, User } = require('../models');
require("dotenv").config();

module.exports = {
    // POST: /api/messages/
    async createMessage(req, res) {
        const { body } = req;
        const message = await DirectMessage.create({
            sender_id: req.session.userId,
            recipient_id: body.receiverId,
            message_content: body.message,
        });
    
        if (!message) return res.status(400).json({ message: 'Unable to send message' });
    
        const sender = await User.findOne({ where: { id: req.session.userId } });
    
        if (!sender) return res.status(404).json({ message: 'Sender not found' });
    
        const messageWithSender = { ...message.get({ plain: true }), sender: sender.get({ plain: true }) };
        
        res.status(200).json(messageWithSender);
    },
    
    
    // GET: /api/messages/:userId
    async getMessagesByUserId(req, res) {
        const { userId } = req.params;
        const messages = await DirectMessage.findAll({
        where: { recipient_id: userId },
        include: [{ model: User, as: 'sender' }],
        });
        if (!messages) return res.status(404).json({ message: 'Messages not found' });
        res.status(200).json(messages);
    }
}

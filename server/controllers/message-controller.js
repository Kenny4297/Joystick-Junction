const { DirectMessage, User } = require("../models");
const { Op } = require("sequelize");
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
        if (!message) return res.status(400).json({ message: "Unable to send message" });
        const sender = await User.findOne({
            where: { id: req.session.userId },
        });
        if (!sender) return res.status(404).json({ message: "Sender not found" });
        const messageWithSender = {
            ...message.get({ plain: true }),
            sender: sender.get({ plain: true }),
        };
        res.status(200).json(messageWithSender);
    },

    // GET: /api/messages/:userId
    async getMessagesByUserId(req, res) {
        const { userId } = req.params;
        const messages = await DirectMessage.findAll({
            where: { recipient_id: userId },
            include: [{ model: User, as: "sender" }],
        });
        if (!messages) return res.status(404).json({ message: "Messages not found" });
        res.status(200).json(messages);
    },

    // GET: /api/messages/conversations/:userId
    async getConversationsByUserId(req, res) {
        const { userId } = req.params;
        const sentMessages = await DirectMessage.findAll({
            where: { sender_id: userId },
            include: [{ model: User, as: "recipient" }],
        });
        const receivedMessages = await DirectMessage.findAll({
            where: { recipient_id: userId },
            include: [{ model: User, as: "sender" }],
        });
        if (!sentMessages && !receivedMessages) return res.status(404).json({ message: "Conversations not found" });

        // Combine both lists and remove duplicates
        const combinedMessages = [...sentMessages, ...receivedMessages];
        const allUsers = combinedMessages.map((message) => (message.sender_id === userId ? message.recipient : message.sender)).filter((user) => user !== null && user !== undefined);

        const uniqueUserIds = [...new Set(allUsers.map((user) => user.id))];
        const uniqueConversations = uniqueUserIds.map((id) => {
            const user = allUsers.find((user) => user.id === id);
            return { ...user.get({ plain: true }), otherUserId: id };
        });

        res.status(200).json(uniqueConversations);
    },

    // GET: /api/messages/:userId/:otherUserId
    async getConversationBetweenUsers(req, res) {
        const { userId, otherUserId } = req.params;
        const messages = await DirectMessage.findAll({
            where: {
                [Op.or]: [
                    { sender_id: userId, recipient_id: otherUserId },
                    { sender_id: otherUserId, recipient_id: userId },
                ],
            },
            include: [{ model: User, as: "sender" }],
            order: [["createdAt", "ASC"]],
        });
        if (!messages) return res.status(404).json({ message: "No conversation found between these users" });

        res.status(200).json(messages);
    },
};

const router = require('express').Router();

const { createMessage, getMessagesByUserId, getConversationsByUserId, getConversationBetweenUsers } = require('../../controllers/message-controller');

router.route('/').post(createMessage);
router.route('/conversations/:userId').get(getConversationsByUserId);
router.route('/:userId/:otherUserId').get(getConversationBetweenUsers);
router.route('/:userId').get(getMessagesByUserId);

module.exports = router;

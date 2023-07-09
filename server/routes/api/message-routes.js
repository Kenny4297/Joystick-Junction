const router = require('express').Router();

const { createMessage, getMessagesByUserId, getConversationsByUserId } = require('../../controllers/message-controller');

router.route('/').post(createMessage);
router.route('/:userId').get(getMessagesByUserId);
router.route('/conversations/:userId').get(getConversationsByUserId);

module.exports = router;

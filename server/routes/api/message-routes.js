const router = require('express').Router();

const { createMessage, getMessagesByUserId } = require('../../controllers/message-controller');

router.route('/').post(createMessage);
router.route('/:userId').get(getMessagesByUserId);

module.exports = router;

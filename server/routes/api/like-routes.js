const express = require('express');
const router = express.Router();

const { createLike, deleteLike } = require('../../controllers/like-controller');

router.route('/').post(createLike).delete(deleteLike);

module.exports = router;
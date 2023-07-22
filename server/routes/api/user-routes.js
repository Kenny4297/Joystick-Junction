const router = require('express').Router();

const { authUser, createUser, updateUser, verifyUser, getUserById, logout } = require('../../controllers/user-controller');

router.route('/').post(createUser);
router.route('/auth').post(authUser);
router.route('/verify').get(verifyUser);
router.route('/logout').get(logout);
router.route('/:id').put(updateUser);
router.route('/users/:userId').get(getUserById);

module.exports = router;

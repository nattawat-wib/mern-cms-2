const authController = require('./../controller/auth-controller');
const { route } = require('./post-route');
const router = require('express').Router();

router.post('/register', authController.register);
router.get('/login', authController.login);
router.delete('/logout', authController.logout);

module.exports = router;
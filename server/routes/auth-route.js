const authController = require('./../controller/auth-controller');
const router = require('express').Router();

router.post('/register', authController.register);

module.exports = router;
const router = require('express').Router();
const memberController = require('./../controller/member-controller');
const authController = require('./../controller/auth-controller');

router.get('/',
    authController.getLoginMember,
    memberController.getAll
);

module.exports = router
const router = require('express').Router();
const memberController = require('./../controller/member-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember)

router.route('/')
    .get(memberController.getAll)
    .patch(memberController.updateMe);

module.exports = router
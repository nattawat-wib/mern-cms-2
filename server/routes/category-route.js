const router = require('express').Router();
const categoryController = require('./../controller/category-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember);

router.route('/')
    .post(categoryController.add)
    .get(categoryController.getAll)

module.exports = router;
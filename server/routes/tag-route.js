const router = require('express').Router();
const tagController = require('./../controller/tag-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember);

router.route('/')
    .post(tagController.add)
    .get(tagController.getAll)

router.route('/:_id')
    .patch(tagController.update)
    .delete(tagController.delete)

module.exports = router;
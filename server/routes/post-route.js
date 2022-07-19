const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');

router.use(authController.getLoginMember);

router.route('/')
    .get(postController.getAll)
    .post(postController.add)

router.route('/:url')
    .patch(postController.update)
    .delete(postController.delete)

module.exports = router;
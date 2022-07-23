const router = require('express').Router();
const postController = require('./../controller/post-controller');
const authController = require('./../controller/auth-controller');
const { config } = require('../tools/multer');

router.use(authController.getLoginMember);

router.route('/')
    .get(postController.getAll)
    .post(
        config.fields([{ name: 'banner' }, { name: 'thumbnail' }]),
        postController.add
    )

router.route('/:_id')
    .patch(postController.update)
    .delete(postController.delete)

module.exports = router;
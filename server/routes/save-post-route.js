const router = require('express').Router();
const savePostController = require('../controller/save-post-controller');
const authController = require('../controller/auth-controller');

router.use(authController.getLoginMember)

router.post('/', savePostController.add)

router.route('/:id')
    .get(savePostController.getOne)
    .patch(savePostController.update)
    .delete(savePostController.delete)

module.exports = router;
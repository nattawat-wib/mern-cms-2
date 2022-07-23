const router = require('express').Router();
const authController = require('../controller/auth-controller');
const daftController = require('../controller/daft-controller');

router.use(authController.getLoginMember)

router.post('/', daftController.add)

router.route('/:id')
    .get(daftController.getOne)
    .patch(daftController.update)
    .delete(daftController.delete)

module.exports = router;
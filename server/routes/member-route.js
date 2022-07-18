const router = require('express').Router();
const memberController = require('./../controller/member-controller');

router.get('/', memberController.getAll);

module.exports = router
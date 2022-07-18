const Member = require('./../model/member-model');
const { catchAsync } = require('./../tools/catch-async');
const { clean } = require('./../tools/form');

exports.register = catchAsync(async (req, res, next) => {
    clean(req.body, ['name', 'password']);

    const member = await Member.create(req.body);

    res.status(201).json({
        status: 'success',
        data: { member }
    })
})
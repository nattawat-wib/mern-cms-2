const Member = require('./../model/member-model');
const { catchAsync } = require('./../tools/catch-async');
const { clean } = require('./../tools/validate');

exports.getAll = catchAsync(async (req, res, next) => {
    const member = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        length: member.length,
        data: { member }
    })
});

exports.updateMe = catchAsync(async (req, res, next) => {
    clean(req.body, ['name']);

    const member = await Member.findOneAndUpdate(
        { username: req.member.username },
        req.body,
        { new: true }
    );

    res.status(200).json({
        status: 'success',
        msg: 'update member successfully',
        data: { member }
    })
})
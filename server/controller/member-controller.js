const Member = require('./../model/member-model');
const { catchAsync } = require('./../tools/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    const member = await Member.find();

    res.status(200).json({
        status: 'success',
        length: member.length,
        data: { member }
    })
});

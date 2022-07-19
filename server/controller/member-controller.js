const Member = require('./../model/member-model');
const { catchAsync } = require('./../tools/catch-async');

exports.getAll = catchAsync(async (req, res, next) => {
    console.log("req.member", req.member);

    const member = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        length: member.length,
        data: { member }
    })
});

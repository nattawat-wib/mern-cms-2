const Member = require('./../model/member-model');
const { catchAsync } = require('./../tools/catch-async');
const { clean } = require('../tools/validate');
const { sendError, sendSuccess } = require('../tools/response');
const jwt = require('jsonwebtoken');

const generateToken = async payload => {
    return await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
}

exports.register = catchAsync(async (req, res) => {
    clean(req.body, ['name', 'password', 'passwordConfirm', 'email']);

    if (req.body.password.length < 6) {
        sendError(400, 'password and password confirm require at least 6 character');
    }

    const isEmailExist = await Member.findOne({ email: req.body.email });
    if (isEmailExist) sendError(400, 'this email is already taken');

    if (req.body.password !== req.body.passwordConfirm) {
        sendError(400, 'password and password confirm should be match');
    }

    req.body.passwordConfirm = undefined;

    const member = await Member.create(req.body);

    res.status(201).json({
        status: 'success',
        data: { member }
    })
})

exports.login = catchAsync(async (req, res) => {
    clean(req.body, ['email', 'password']);

    const member = await Member.findOne({ email: req.body.email }).select('+password');
    if (!member) sendError(404, 'member not found with this email');

    if (!await member.isPasswordCorrect(req.body.password, member.password)) {
        sendError(400, 'password or email is not correct');
    }

    const token = await generateToken({ email: member.email });

    member.accessToken = token
    await member.save();

    res
        .cookie('accessToken', token)
        .status(200)
        .json({
            status: 'success',
            msg: 'login successfully',
            data: { member }
        })
})

exports.logout = catchAsync(async (req, res) => {
    res
        .clearCookie('accessToken')
        .status(200)
        .json({
            status: 'success',
            msg: 'logout successfully'
        })
})

exports.getLoginMember = catchAsync(async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) sendError(401, 'token not found! you are not login yet, please login');

    jwt.verify(accessToken, process.env.JWT_SECRET, err => {
        if (err) sendError(401, `Authorization Token Error: ${err.message}`);
    })

    const member = await Member.findOne({ accessToken });
    if (!member) sendError(404, 'member not found with this token');

    req.member = member;
    next();
})

// exports.getLoginAdmin = catchAsync(async (req, res, next) => {
//     const { adminToken } = req.cookies;
//     if (!adminToken) sendError(401, 'token not found! you are not login yet, please login');

//     jwt.verify(adminToken, process.env.JWT_SECRET, err => {
//         if (err) sendError(400, `token error: ${err.message}`);
//     })

//     const admin = await Member.findOne({ adminToken });
//     if (!admin) sendError(404, 'admin not found with this token');

//     req.admin = admin;
//     next();
// })
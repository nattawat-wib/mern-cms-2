const Daft = require('../model/daft-model');
const catchAsync = require('../tools/catch-async');
const { resSuccess, resError } = require('../tools/response');

exports.add = catchAsync(async (req, res) => {
    // const daft = await Daft.create({
    //     owner: req.member._id
    // })

    // resSuccess(res, 201, `create save post for member ID: ${req.member._id} successfully`)
})

exports.getOne = catchAsync(async (req, res) => {
    const daft = await Daft
        .findOne({ owner: req.member._id })
        .populate('owner postList');

    resSuccess(res, 200, '')
})

exports.update = catchAsync(async (req, res) => {
    const daft = await Daft
        .findOne({ owner: req.member._id })
        .populate('owner postList');

    resSuccess(res, 200, '')
})

exports.delete = catchAsync(async (req, res) => {
    const daft = await Daft
        .findOne({ owner: req.member._id })
        .populate('owner postList');

    resSuccess(res, 200, '')
})
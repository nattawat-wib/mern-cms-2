const Category = require('./../model/category-model');
const AppError = require('../tools/app-error');
const { catchAsync } = require('../tools/catch-async');
const { clean } = require('../tools/form');

exports.add = catchAsync(async (req, res) => {
    clean(['name', 'title', 'desc']);

    // const category = await Category.findOne();

    throw new AppError(400, 'this name is already exist');
})

exports.getAll = catchAsync(async (req, res) => {
    const category = await Category.find();

    res.status(200).json({
        status: 'success',
        length: category.length,
        msg: 'all category',
        data: { category }
    })
})
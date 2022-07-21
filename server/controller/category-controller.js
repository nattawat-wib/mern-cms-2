const Category = require('./../model/category-model');
const AppError = require('../tools/app-error');
const { catchAsync } = require('../tools/catch-async');
const { clean, isExist } = require('../tools/validate');
const { findByIdAndUpdate } = require('../model/member-model');

exports.add = catchAsync(async (req, res) => {
    clean(req.body, ['nameTh', 'nameEn', 'titleTh', 'titleEn', 'descTh', 'descEn', 'slug']);
    req.body.slug = req.body.slug.split(' ').join('-');

    await isExist(req.body, null, Category, ['nameTh', 'nameEn', 'slug']);

    const category = await Category.create(req.body);

    res.status(200).json({
        status: 'success',
        msg: 'create category successfully',
        data: { category }
    })
})

exports.getAll = catchAsync(async (req, res) => {
    const category = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        length: category.length,
        msg: 'all category',
        data: { category }
    })
})

exports.delete = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params._id);
    if (!category) throw new AppError(404, 'category not found whit this ID');

    await Category.deleteOne({ _id: category._id });

    res.status(200).json({
        status: 'success',
        msg: 'delete category successfully'
    })
})

exports.update = catchAsync(async (req, res) => {
    const category = await Category.findById(req.params._id);
    if (!category) throw new AppError(404, 'category not found whit this ID');

    const allowKeyList = ['nameTh', 'nameEn', 'titleTh', 'titleEn', 'descTh', 'descEn', 'slug'];
    clean(req.body, allowKeyList, allowKeyList);
    req.body.slug = req.body.slug.split(' ').join('-');

    await isExist(req.body, category._id, Category, ['nameTh', 'nameEn', 'slug']);

    const updateCategory = await Category.findByIdAndUpdate(category._id, req.body);

    res.status(200).json({
        status: 'success',
        msg: 'update category successfully',
        data: { updateCategory }
    })
})
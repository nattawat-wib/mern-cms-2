const tag = require('./../model/tag-model');
const AppError = require('../tools/app-error');
const { catchAsync } = require('../tools/catch-async');
const { clean, isExist } = require('../tools/validate');

exports.add = catchAsync(async (req, res) => {
    clean(req.body, ['nameTh', 'nameEn', 'titleTh', 'titleEn', 'descTh', 'descEn', 'slug']);
    req.body.slug = req.body.slug.split(' ').join('-');

    await isExist(req.body, null, Tag, ['nameTh', 'nameEn', 'slug']);

    const tag = await Tag.create(req.body);

    res.status(200).json({
        status: 'success',
        msg: 'create tag successfully',
        data: { tag }
    })
})

exports.getAll = catchAsync(async (req, res) => {
    const tag = await Tag.find().sort({ createdAt: -1 });

    res.status(200).json({
        status: 'success',
        length: tag.length,
        msg: 'all tag',
        data: { tag }
    })
})

exports.delete = catchAsync(async (req, res) => {
    const tag = await Tag.findById(req.params._id);
    if (!tag) throw new AppError(404, 'tag not found whit this ID');

    await Tag.deleteOne({ _id: tag._id });

    res.status(200).json({
        status: 'success',
        msg: 'delete tag successfully'
    })
})

exports.update = catchAsync(async (req, res) => {
    const tag = await Tag.findById(req.params._id);
    if (!tag) throw new AppError(404, 'tag not found whit this ID');

    const allowKeyList = ['nameTh', 'nameEn', 'titleTh', 'titleEn', 'descTh', 'descEn', 'slug'];
    clean(req.body, allowKeyList, allowKeyList);
    req.body.slug = req.body.slug.split(' ').join('-');

    await isExist(req.body, tag._id, Tag, ['nameTh', 'nameEn', 'slug']);

    const updatetag = await Tag.findByIdAndUpdate(tag._id, req.body);

    res.status(200).json({
        status: 'success',
        msg: 'update tag successfully',
        data: { updatetag }
    })
})
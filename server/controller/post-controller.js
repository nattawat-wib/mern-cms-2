const AppError = require('../tools/app-error');
const { catchAsync } = require('../tools/catch-async');
const { clean } = require('../tools/form');
const Post = require('./../model/post-model');

exports.add = catchAsync(async (req, res) => {
    clean(req.body, ['titleTh', 'titleEn', 'contentTh', 'contentEn', 'category', 'tag', 'url'], ['tag']);
    
    req.body.url = req.body.url.split(' ').join('-');

    const isUrlExist = await Post.findOne({ url: req.body.url });
    if(isUrlExist) throw new AppError(400, 'this url is already taken');

    const post = await Post.create({
        author: req.member._id,
        ...req.body
    })

    res.status(201).json({
        status: 'success',
        msg: 'created post successfully',
        data: { post }
    })
})

exports.getAll = catchAsync(async (req, res) => {
    const post = await Post.find();

    res.status(200).json({
        status: 'success',
        length: post.length,
        data: { post }
    })
})

exports.update = catchAsync(async (req, res) => {

})

exports.delete = catchAsync(async (req, res) => {
    const post = await Post.findOneAndDelete({ url: req.params.url }, { new: true });

    if(!post) throw new AppError(404, 'post not found with this url')

    res.status(200).json({
        status: 'success',
        msg: 'delete successfully'
    })
})
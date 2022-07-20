const AppError = require('../tools/app-error');
const { catchAsync } = require('../tools/catch-async');
const { clean } = require('../tools/form');
const Post = require('./../model/post-model');

exports.add = catchAsync(async (req, res) => {
    clean(req.body, ['titleTh', 'titleEn', 'contentTh', 'contentEn', 'category', 'tag', 'url'], ['tag']);

    req.body.url = req.body.url.split(' ').join('-');

    const isUrlExist = await Post.findOne({ url: req.body.url });
    if (isUrlExist) throw new AppError(400, 'this url is already taken');

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
    const allowKeyList = ['titleTh', 'titleEn', 'contentTh', 'contentEn', 'category', 'tag', 'url'];
    clean(req.body, allowKeyList, allowKeyList);

    if(!Object.keys(req.body).length) throw new AppError(404, 'not found any key for update');

    const post = await Post.findById(req.params._id);
    if (!post) throw new AppError(404, 'post not found with this id');

    // check are you owner of this post
    if (String(post.author) !== String(req.member._id)) {
        throw new AppError(400, 'cannot delete, you are not owner of this post');
    }

    const updatePost = await Post.findByIdAndUpdate(post._id, { ...req.body }, { new: true });

    res.status(200).json({
        status: 'success',
        msg: 'update post successfully',
        data: { post: updatePost }
    })
})

exports.delete = catchAsync(async (req, res) => {
    const post = await Post.findById(req.params._id);

    if (!post) throw new AppError(404, 'post not found with this id');

    // check are you owner of this post
    if (String(post.author) !== String(req.member._id)) {
        throw new AppError(400, 'cannot delete, you are not owner of this post');
    }

    await Post.deleteOne({ id: post._id });

    res.status(200).json({
        status: 'success',
        msg: 'delete successfully'
    })
})
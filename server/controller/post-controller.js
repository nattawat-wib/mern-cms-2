const Post = require('./../model/post-model');
const { resError, resSuccess } = require('../tools/response');
const catchAsync = require('../tools/catch-async');
const { clean, isExist } = require('../tools/validate');
const { deleteOne, getAll } = require('../tools/controller-handler');

exports.getAll = getAll(Post, ['category tag', '-createdAtDateTime -__v']);
exports.delete = deleteOne(Post, 'author');

exports.add = catchAsync(async (req, res) => {
    clean(req.body,
        ['titleTh', 'titleEn', 'contentTh', 'contentEn', 'category', 'tag', 'url'],
        ['tag']
    );

    req.body.url = req.body.url.split(' ').join('-');
    await isExist(req.body, null, Post, ['titleTh', 'titleEn', 'url']);

    // check is tag duplicate
    const duplicateTag = req.body.tag.find((tag, i) => req.body.tag.indexOf(tag) !== i)
    if (duplicateTag) resError(400, `tag ID: ${duplicateTag} has been duplicated`);

    const post = await Post.create({
        author: req.member._id,
        thumbnail: req.files.thumbnail[0].filename,
        banner: req.files.banner[0].filename,
        ...req.body
    })

    resSuccess(res, 201, 'created post successfully', { post })
})

exports.update = catchAsync(async (req, res) => {
    const allowKeyList = ['titleTh', 'titleEn', 'contentTh', 'contentEn', 'category', 'tag', 'url'];
    clean(req.body, allowKeyList, allowKeyList);

    if (!Object.keys(req.body).length) resError(404, 'not found any key for update');

    // check is post exist
    const post = await Post.findById(req.params._id);
    if (!post) resError(404, 'post not found with this id');

    // check is key exist
    await isExist(req.body, post._id, Post, ['titleTh', 'titleEn', 'url']);

    // check is tag duplicate
    const duplicateTag = req.body.tag.find((tag, i) => req.body.tag.indexOf(tag) !== i)
    if (duplicateTag) resError(400, `tag ID: ${duplicateTag} has been duplicated`);

    // check are you owner of this post
    if (String(post.author) !== String(req.member._id)) {
        resError(400, 'cannot delete, you are not owner of this post');
    }

    const updatePost = await Post.findByIdAndUpdate(post._id, { ...req.body }, { new: true });

    resSuccess(res, 200, 'update post successfully', { post: updatePost })
})
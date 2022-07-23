const { populate, modelName } = require("../model/post-model");
const { catchAsync } = require("./catch-async");
const { sendError, sendSuccess } = require("./response");
const { clean, isExist } = require("./validate");

// exports.add = catchAsync(async (res, res) => {
//     sendSuccess(res, 201, 'create success')
// })

exports.getOne = (model, populate) => catchAsync(async (req, res) => {
    const { modelName } = model;
    const doc = await model
        .find()
        .sort({ createdAt: -1 })
        .populate(...populate);

    sendSuccess(res, 200, `all ${modelName}`, { [modelName]: doc })
})

exports.getAll = (model, populate) => catchAsync(async (req, res) => {
    const { modelName } = model;
    const doc = await model
        .find()
        .sort({ createdAt: -1 })
        .populate(...populate);

    sendSuccess(res, 200, `all ${modelName}`, { [modelName]: doc }, doc.length)
})

exports.deleteOne = (model, checkOwnerKey, extendValidate) => catchAsync(async (req, res) => {
    const { modelName } = model;
    const doc = await model.findOne({ _id: req.params._id });

    if (!doc) sendError(404, `${modelName} not found with this ID`);

    if (checkOwnerKey) {
        if (!doc[checkOwnerKey]) sendError(404, `cannot check owner, ${modelName} don't have field ${checkOwnerKey}`)

        if (String(doc[checkOwnerKey]) !== String(req.member._id)) {
            sendError(400, `cannot delete!!, you are not owner of this ${modelName}`)
        }
    }

    if (extendValidate) extendValidate(req, res)

    await model.deleteOne({ _id: doc._id });

    sendSuccess(res, 200, `delete ${modelName} successfully`);
})
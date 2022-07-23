const { UndoUploadFile } = require("./multer");

exports.catchAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(err => {
        
        if(req.files) UndoUploadFile(req.files)

        next(err)
    });
}
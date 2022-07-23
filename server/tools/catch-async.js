const { UndoUploadFile } = require("./multer");

module.exports = catchAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(err => {
        
        if(req.files) UndoUploadFile(req.files)

        next(err)
    });
}


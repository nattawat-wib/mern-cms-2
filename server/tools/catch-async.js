const { UndoUploadFile } = require("./multer");

module.exports = catchAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(err => {
 
        // remove file that upload but fail
        if(req.files) UndoUploadFile(req.files);
        
        next(err);
    });
}


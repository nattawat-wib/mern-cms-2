exports.catchAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(next);
}

exports.fileAsync = fn => (req, res, next) => {
    fn(req, res, next).catch(err => {

        // method for delete file that uploaded but error
        next(err)
    });
}
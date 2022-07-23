const multer = require('multer');
const fs = require('fs');

exports.config = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads');
        },
        filename: (req, file, cb) => {
            const uid = `${Date.now()}-${Math.random().toString(32).slice(2)}`;

            cb(null, `${uid}-${file.originalname}`);
        }
    })
})

exports.UndoUploadFile = fileList => {
    for (const key in fileList) {
        fileList[key].forEach(file => {
            fs.unlink(file.path, err => {
                if (err) console.log('unlink file ERROR💥' + err);
            });
        })
    }
}
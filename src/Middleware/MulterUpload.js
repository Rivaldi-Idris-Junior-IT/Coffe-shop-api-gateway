const multer = require ("multer")

const storage = multer.diskStorage({
    filename : function (req, file, cb) {
        cb(null, file.fieldname + new Date().getTime() + "-" + file.originalname)
    }
});

const filter = (req, file, cb) => {
    if(file.mimetype == "image/jpg" || file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true)
    }else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: filter,
    limits : {
        fileSize:  20 * 1024 * 1024 
    }
});

module.exports = upload
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      if(ext)
      cb(null, file.fieldname + '-' + uniqueSuffix+ext)
    }
})

//validate file as image only
module.exports = multer({ storage: storage ,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }})
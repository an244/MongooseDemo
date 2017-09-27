const multer = require('multer');

//setup noi chua file
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

//setup loc loai file
function fileFilter(req, file, cb){
    const {mimetype} = file;
    //xac dinh kieu file
    if (mimetype === 'image/png'|| mimetype === 'image/jpeg'|| mimetype === 'image/jpg'){
        return cb(null, true);
    }
    cb(new Error('Yeu cau file co duoi .png, .jpeg, .jpg'));
}

//setup dung luong file tai len
const limits = {fileSize: 1024000};

//ket hop lai cac thanh phan tren
const upload = multer({storage,limits,fileFilter});

//export ra de su dung trong file .js khac
module.exports = upload;
// middleware for handling multipart/form-data
const multer = require('multer');

// kell egy Storage, ahova a fájlt rakja
const Storage = multer.diskStorage({
  // fájl helye itt lesz
  destination(req, file, callback) {
    callback(null, './uploaded_files');
  },
  // setteli a file nevét
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

// csak arra hallgat, ahol kliens oldalon a field name='rc_upload' volt
// lsd. kliens oldalon majd
// egyszerre 3 fájlban maximalizálom
const upload = multer({
  storage: Storage
}).array('rc_upload', 3);


module.exports = {
  upload
};

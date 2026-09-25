const multer = require('multer');
const path = require('path');
const rootPath = path.join(__dirname, '..');
const publicFolderPath = path.join(rootPath, 'public');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderMapping = {
      'materiales': 'materiales',
      'producciones': 'producciones',
      'planificacion': 'planificacion',
      'imagen': 'imagen',
    };

    const folderName = folderMapping[file.fieldname] || '';
    const destinationPath = path.join(publicFolderPath, folderName);

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 25 * 1024 * 1024 },
}).fields([
  { name: 'materiales', maxCount: 10 },
  { name: 'producciones', maxCount: 10 },
  { name: 'planificacion', maxCount: 1 },
  { name: 'imagen', maxCount: 1 }
]);

module.exports = upload;

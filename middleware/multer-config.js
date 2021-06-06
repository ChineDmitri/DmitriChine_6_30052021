const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // array si espace ET join array avec 
        const extention = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extention);  // retour name de fichier 
    }
});

module.exports = multer({storage}).single('image'); // export une seul image,
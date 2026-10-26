// server/admin/middleware/uploadImage.js
// Reads one image from a multipart/form-data request into req.file (kept in memory, never on disk).
// The text fields of the same form end up in req.body as usual.
const multer = require('multer');

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB (Cloudinary free-plan image limit)

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    const error = new Error('Not an image');
    error.code = 'NOT_AN_IMAGE';
    cb(error);
  },
});

// uploadImage('image') -> middleware for a form field named "image".
// Turns multer's errors into a 400 JSON reply instead of a server crash page.
const uploadImage = (fieldName) => (req, res, next) => {
  upload.single(fieldName)(req, res, (error) => {
    if (!error) return next();
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'Image must be 10 MB or smaller.' });
    }
    if (error.code === 'NOT_AN_IMAGE') {
      return res.status(400).json({ message: 'Only image files are allowed.' });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Only one image file is allowed.' });
    }
    console.error('uploadImage error:', error);
    return res.status(400).json({ message: 'Could not read the uploaded file.' });
  });
};

module.exports = { uploadImage };

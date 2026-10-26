// server/config/cloudinary.js
// Cloudinary is only used from the server, so the API secret never reaches the browser
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // always return https:// URLs
});

// Upload an in-memory file (multer's req.file.buffer) into a Cloudinary folder.
// Resolves with { secure_url, public_id, ... }.
const uploadImage = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

// Remove an image again, e.g. when saving the database row fails after the upload
const deleteImage = (publicId) => cloudinary.uploader.destroy(publicId);

module.exports = { uploadImage, deleteImage };

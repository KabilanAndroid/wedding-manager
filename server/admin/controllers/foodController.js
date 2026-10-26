// server/admin/controllers/foodController.js
const { validateFood, modelAddFood, modelGetFoods } = require('../models/Food');
const { uploadImage, deleteImage } = require('../../config/cloudinary');

// Cloudinary folder for each dietary type
const IMAGE_FOLDERS = {
  Vegetarian: 'Events/Foods/veg',
  'Non-Vegetarian': 'Events/Foods/non_veg',
};

// POST /api/admin/foods  (multipart/form-data: text fields + optional "image" file)
const addFood = async (req, res) => {
  let uploaded = null;
  try {
    const { name, description, price, dietaryType, status } = req.body;

    // validate before uploading, so a bad form never puts an image on Cloudinary
    const validationError = validateFood({ name, price, dietaryType, status });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    if (req.file) {
      uploaded = await uploadImage(req.file.buffer, IMAGE_FOLDERS[dietaryType]);
    }

    const id = await modelAddFood({
      name, description, price, dietaryType, status,
      image: uploaded?.secure_url,
    });
    return res.status(201).json({
      message: 'Food item added successfully',
      id,
      image: uploaded?.secure_url ?? null,
    });
  } catch (error) {
    console.error('addFood error:', error);
    // the row was not saved, so don't leave its image behind on Cloudinary
    if (uploaded) {
      deleteImage(uploaded.public_id).catch((e) => console.error('deleteImage error:', e));
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/admin/foods
const getFoods = async (req, res) => {
  try {
    const foods = await modelGetFoods();
    return res.status(200).json({ foods });
  } catch (error) {
    console.error('getFoods error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addFood, getFoods };

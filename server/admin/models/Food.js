// server/admin/models/Food.js
// Everything that touches the food_items table
const { pool } = require('../../db');

const DIETARY_TYPES = ['Vegetarian', 'Non-Vegetarian'];
const STATUSES = ['active', 'inactive'];

// Check the request body. Returns an error message, or null when everything is valid.
const validateFood = ({ name, price, dietaryType, status }) => {
  if (typeof name !== 'string' || name.trim().length === 0) {
    return 'Name is required.';
  }
  // the form sends price as a string like "450", so convert before checking
  if (price === undefined || price === '' || !(Number(price) > 0)) {
    return 'Price must be a number greater than 0.';
  }
  if (!DIETARY_TYPES.includes(dietaryType)) {
    return `Dietary type must be one of: ${DIETARY_TYPES.join(', ')}.`;
  }
  if (status !== undefined && !STATUSES.includes(status)) {
    return `Status must be one of: ${STATUSES.join(', ')}.`;
  }
  return null;
};

// Insert one food item and return its new id. image is the Cloudinary URL (or null).
const modelAddFood = async ({ name, description, price, dietaryType, image, status }) => {
  const [result] = await pool.query(
    `INSERT INTO food_items (name, description, price, dietary_type, image_url, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      name.trim(),
      description?.trim() || null,
      Number(price),
      dietaryType,
      image || null,
      status ?? 'active',
    ]
  );
  return result.insertId;
};

// All food items, newest first. Column aliases give the frontend camelCase names.
const modelGetFoods = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, description, price, dietary_type AS dietaryType,
            image_url AS image, status, created_at AS createdAt
     FROM food_items
     ORDER BY created_at DESC`
  );
  return rows;
};

module.exports = { DIETARY_TYPES, validateFood, modelAddFood, modelGetFoods };

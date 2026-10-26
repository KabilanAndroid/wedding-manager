// server/admin/routes/index.js
// Everything under /api/admin
const express = require('express');
const { protectAdmin } = require('../middleware/protectAdmin');
const { uploadImage } = require('../middleware/uploadImage');
const { login } = require('../controllers/authController');
const { getUsers } = require('../controllers/usersController');
const {addCategories} = require('../controllers/categoriesController');
const { addFood, getFoods } = require('../controllers/foodController');

const router = express.Router();

//=======================POST==================================
// Public: admin login
router.post('/auth/login', login); // POST /api/admin/auth/login
router.post('/addcategories',addCategories);


//=======================GET=====================================



//============================MIDDLEWARE========================
// Every route below this line needs an admin token
router.use(protectAdmin);

router.get('/users', getUsers); // GET /api/admin/users

// Food & catering
router.post('/foods', uploadImage('image'), addFood); // POST /api/admin/foods (form + image file)
router.get('/foods', getFoods); // GET  /api/admin/foods

module.exports = router;

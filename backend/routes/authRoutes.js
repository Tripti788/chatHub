const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const { getAllUsers } = require('../controllers/userController');
const router = express.Router();


router.post('/register',registerUser);

router.post('/login',loginUser);

router.post('/users',protect,getAllUsers);


module.exports = router;

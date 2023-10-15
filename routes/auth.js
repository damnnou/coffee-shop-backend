const { Router } = require("express");
const { register, login, getMe } = require("../controllers/auth")
const { checkAuth } = require("../utils/checkAuth")
const { createProduct } = require('../controllers/products')

const router = new Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Get Me
router.get('/me', checkAuth, getMe);

module.exports = router;
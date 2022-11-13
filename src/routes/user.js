let express = require('express');
let router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const updateProfileAuth = require("../middlewares/updateProfileAuth");


// Login
router.get('/login', userController.login);
router.post('/login', userController.loginprocess);

// Logout
router.get('/logout', userController.logout);


// Profile
router.get('/perfil' , userController.perfil);



module.exports = router;
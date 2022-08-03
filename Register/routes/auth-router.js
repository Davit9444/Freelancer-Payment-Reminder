const express = require('express');
const router = express.Router();
const AuthController = require('../controller/auth-controller');


router.get('/login', AuthController.login);
router.post('/login', AuthController.loginPost);
router.get('/register', AuthController.register);
router.post('/register', AuthController.registerPost);
router.post('/home', AuthController.transfer);



module.exports = router;
const express = require('express');
const userController = require('../Controller/users')
const userRoutes = express.Router();
const verifyToken = require('../Middleware/Authentication')
const upload = require('../Middleware/MulterUpload');


userRoutes.post('/register', upload.single('avatar'), userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/', verifyToken, userController.getAllUsers);
userRoutes.get('/:id', verifyToken, userController.getProfile);
userRoutes.put('/:id', verifyToken, upload.single('avatar'),  userController.getUpdate);
userRoutes.delete('/:id', verifyToken, userController.delete);

module.exports = userRoutes
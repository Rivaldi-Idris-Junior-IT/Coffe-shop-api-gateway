const express = require('express');
const userController = require('../Controller/users')
const userRoutes = express.Router();
const verifyToken = require('../Middleware/Authentication')
// const refreshToken = require('../Middleware/RefreshToken')

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/:id', verifyToken, userController.getProfile);
userRoutes.put('/:id', verifyToken, userController.getUpdate);
userRoutes.delete('/:id', verifyToken, userController.delete);

module.exports = userRoutes
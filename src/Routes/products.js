const express = require('express');
const productController = require('../Controller/products')
const userRoutes = express.Router();
const verifyToken = require('../Middleware/Authentication')
// const refreshToken = require('../Middleware/RefreshToken')

userRoutes.post('/', verifyToken, productController.addProduct);
userRoutes.put('/:id', verifyToken, productController.getUpdate);
userRoutes.delete('/:id', verifyToken, productController.delete);
userRoutes.get('/', verifyToken, productController.getAllProducts);



module.exports = userRoutes
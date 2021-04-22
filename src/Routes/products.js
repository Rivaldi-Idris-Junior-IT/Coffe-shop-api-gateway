const express = require('express');
const productController = require('../Controller/products')
const userRoutes = express.Router();
const verifyToken = require('../Middleware/Authentication')
const upload = require('../Middleware/MulterUpload');
// const refreshToken = require('../Middleware/RefreshToken')

userRoutes.post('/', verifyToken, upload.single('images'),  productController.addProduct);
userRoutes.put('/:id', verifyToken, upload.single('images'), productController.getUpdate);
userRoutes.delete('/:id', verifyToken, productController.delete);
userRoutes.get('/', verifyToken, productController.getAllProducts);



module.exports = userRoutes
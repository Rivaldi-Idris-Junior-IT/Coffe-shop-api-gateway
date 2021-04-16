const express = require('express');
const orderController = require('../Controller/orders')
const orderRoutes = express.Router();
const verifyToken = require('../Middleware/Authentication')
// const refreshToken = require('../Middleware/RefreshToken')

orderRoutes.get('/', verifyToken, orderController.getOrdersAll);
orderRoutes.post('/', verifyToken, orderController.addOrders);
orderRoutes.put('/:id', verifyToken, orderController.getUpdate);
orderRoutes.delete('/:id', verifyToken, orderController.delete);




module.exports = orderRoutes
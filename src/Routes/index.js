const express = require('express')
const userRoutes = require('./users');
const productRoutes = require('./products')
const orderRoutes = require('./orders')
const router = express.Router();

router.use("/users", userRoutes)
router.use("/products", productRoutes)
router.use("/orders", orderRoutes)

router.all("*", (req, res) => {
    return res.status(404).json({
        messages: "url is not valid, please check the documentation"
    });
});

module.exports = router;
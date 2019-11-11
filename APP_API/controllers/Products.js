const mongoose = require('mongoose');
const Products = mongoose.model('Products');

const getProducts = (req, res) => {
    Products
        .find()
        .populate('category')
        .sort([['name', 'ascending']])
        .exec((err, productsData) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(productsData);
        });
};

const getProductsByUser = (req, res) => {
    Products
        .find({
            username: req.userCookie.userId
        })
        .populate('category')
        .sort([['name', 'ascending']])
        .exec((err, productsData) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(productsData);
        });
};

const createProduct = (req, res) => {
    Products
        .create({
            username: req.userCookie.userId,
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            available: true
        }, (err, productData) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(productData);
        });
};

const updateAvailability = (req, res) => {
    if(!req.params.productid) {
        res
            .status(404)
            .json({ "message" : "Not found, Product ID is required" });
        return;
    }
    Products
        .findById(req.params.productid)
        .exec((err, productData) => {
            if(!productData) {
                res
                    .status(404)
                    .json({ "message" : "Product Not found" });
                return;
            } else if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            productData.available = !productData.available;
            productData.save((err, updatedProduct) => {
                res
                    .status(200)
                    .json(updatedProduct);
            });
        });
};

module.exports = {
    getProducts,
    getProductsByUser,
    createProduct,
    updateAvailability
};

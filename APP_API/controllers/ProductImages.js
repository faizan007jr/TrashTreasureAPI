const mongoose = require('mongoose');
const ProductImages = mongoose.model('ProductImages');

const createProductImageURL = (req, res) => {
    if(!req.params.productid) {
        res
            .status(404)
            .json({ "message" : "Not found, Product ID is required" });
        return;
    }
    ProductImages
        .create({
            product: req.params.productid,
            imageURL: req.body.imageURL
        }, (err, productImage) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(productImage);
        });
};

const getProductImages = (req, res) => {
    if(!req.params.productid) {
        res
            .status(404)
            .json({ "message" : "Not found, Product ID is required" });
        return;
    }
    ProductImages
        .find({ product: req.params.productid })
        .exec((err, productImages) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(productImages);
        });
};

module.exports = {
    createProductImageURL,
    getProductImages
};
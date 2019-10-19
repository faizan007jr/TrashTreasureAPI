const mongoose = require('mongoose');
const Categories = mongoose.model('Categories');

const getCategories = (req, res) => {
    Categories
        .find()
        .sort([['category', 'ascending']])
        .exec((err, categories) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(categories);
        });
};

const createCategory = (req, res) => {
    Categories
        .create({
            category: req.body.category
        }, (err, category) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(category);
        });
};

module.exports = {
    getCategories,
    createCategory
};
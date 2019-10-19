const mongoose = require('mongoose');
const Comments = mongoose.model('Comments');

const getProductComments = (req, res) => {
    if(!req.params.productid) {
        res
            .status(404)
            .json({ "message" : "Not found, Product ID is required" });
        return;
    }
    Comments
        .find({ product: req.params.productid })
        .exec((err, comments) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(comments);
        });
};

const createComment = (req, res) => {
    if(!req.params.productid) {
        res
            .status(404)
            .json({ "message" : "Not found, Product ID is required" });
        return;
    }
    Comments
        .create({
            username: req.body.userid,
            product: req.params.productid,
            comment: req.body.comment,
            rating: req.body.rating
        }, (err, commentData) => {
            if(err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(commentData);
        });
};

const deleteComment = (req, res) => {
    if(!req.params.commentid) {
        res
            .status(404)
            .json({ "message" : "Not found, Comment ID is required" });
        return;
    }
    Comments
        .findOneAndDelete(req.params.commentid)
        .exec((err, commentData) => {
            if(err) {
                res
                    .status(404)
                    .json(err);
            } else {
                res
                    .status(204)
                    .json({"message" : "Comment Document deleted"});
            }
        });
};

module.exports = {
    createComment,
    getProductComments,
    deleteComment
};
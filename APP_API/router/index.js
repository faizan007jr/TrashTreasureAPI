let express = require('express');
let router = express.Router();

const sessionChecker = require('../controllers/SessionChecker');

const ctrlUsers = require('../controllers/Users');
const ctrlCategories = require('../controllers/Categories');
const ctrlProducts = require('../controllers/Products');
const ctrlProductImages = require('../controllers/ProductImages');
const ctrlComments = require('../controllers/Comments');
const ctrlChats = require('../controllers/Chats');

router.get('/asd', sessionChecker, (req, res) => {
    res
        .status(200)
        .json({ "message": "Welcome " + req.session.user });
});

//router.get('/users', ctrlUsers.getUsers);
router.post('/users', ctrlUsers.createUser);
router.post('/users/login', ctrlUsers.login);

router.get('/users/login', sessionChecker, (req, res) => {
    res
        .status(200)
        .json({ "username" : req.session.user })
});

router.get('/users/logout', ctrlUsers.logout);
router.get('/users/:userid', sessionChecker, ctrlUsers.getSingleUser);

router.put('/password/:username', sessionChecker, ctrlUsers.updatePassword);
router.put('/profileimage/:username', sessionChecker, ctrlUsers.updateProfileImage);
router.put('/address/:username', sessionChecker, ctrlUsers.updateAddress);

router.get('/categories', ctrlCategories.getCategories);
router.post('/categories', ctrlCategories.createCategory);

router.get('/products', ctrlProducts.getProducts);
router.post('/products', sessionChecker, ctrlProducts.createProduct);
router.put('/availability/:productid', sessionChecker, ctrlProducts.updateAvailability);

router.get('/productimages/:productid', ctrlProductImages.getProductImages);
router.post('/productimages/:productid', sessionChecker, ctrlProductImages.createProductImageURL);

router.get('/comments/:productid', ctrlComments.getProductComments);
router.post('/comments/:productid', sessionChecker, ctrlComments.createComment);
router.delete('/comments/:commentid', sessionChecker, ctrlComments.deleteComment);

router.post('/chats/:userid', sessionChecker, ctrlChats.sendMessage);
router.get('/chats/:userid', sessionChecker, ctrlChats.getMessages);

module.exports = router;
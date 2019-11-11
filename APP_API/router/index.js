let express = require('express');
let router = express.Router();

const ctrlUsers = require('../controllers/Users');
const ctrlCategories = require('../controllers/Categories');
const ctrlProducts = require('../controllers/Products');
const ctrlProductImages = require('../controllers/ProductImages');
const ctrlComments = require('../controllers/Comments');
const ctrlChats = require('../controllers/Chats');

const checkAuth = require('../middleware/check-auth');
const checkAuthParam = require('../middleware/check-auth-param');

router.get('/asd', checkAuth, (req, res) => {
    res
        .status(200)
        .json({ "message": "Welcome " + req.userCookie.username });
});

//router.get('/users', ctrlUsers.getUsers);
router.post('/users', ctrlUsers.createUser);
router.post('/users/login', ctrlUsers.login);

router.post('/users/checklogin', checkAuth, (req, res) => {
    console.log(req.userCookie);
    res
        .status(200)
        .json({ "username" : req.userCookie.username });
});

/*router.get('/users/logout', ctrlUsers.logout);*/
router.get('/users/:userid', checkAuth, ctrlUsers.getSingleUser);

router.put('/password/:username', checkAuth, ctrlUsers.updatePassword);
router.put('/profileimage/:username', checkAuth, ctrlUsers.updateProfileImage);
router.put('/address/:username', checkAuth, ctrlUsers.updateAddress);

router.get('/categories', ctrlCategories.getCategories);
router.post('/categories', ctrlCategories.createCategory);

router.get('/products', ctrlProducts.getProducts);
router.get('/products/:token', checkAuthParam, ctrlProducts.getProductsByUser);

router.post('/products', checkAuth, ctrlProducts.createProduct);
router.put('/availability/:productid', checkAuth, ctrlProducts.updateAvailability);

router.get('/productimages/:productid', ctrlProductImages.getProductImages);
router.post('/productimages/:productid', checkAuth, ctrlProductImages.createProductImageURL);

router.get('/comments/:productid', ctrlComments.getProductComments);
router.post('/comments/:productid', checkAuth, ctrlComments.createComment);
router.delete('/comments/:commentid', checkAuth, ctrlComments.deleteComment);

router.post('/chats/:userid', checkAuth, ctrlChats.sendMessage);
router.get('/chats/:userid', checkAuth, ctrlChats.getMessages);

module.exports = router;
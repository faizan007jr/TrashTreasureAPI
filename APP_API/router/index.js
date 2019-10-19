let express = require('express');
let router = express.Router();

const ctrlUsers = require('../controllers/Users');
const ctrlCategories = require('../controllers/Categories');
const ctrlProducts = require('../controllers/Products');
const ctrlProductImages = require('../controllers/ProductImages');
const ctrlComments = require('../controllers/Comments');
const ctrlChats = require('../controllers/Chats');

router.get('/users', ctrlUsers.getUsers);
router.post('/users', ctrlUsers.createUser);
router.get('/users/:userid', ctrlUsers.getSingleUser);

router.put('/password/:username', ctrlUsers.updatePassword);
router.put('/profileimage/:username', ctrlUsers.updateProfileImage);
router.put('/address/:username', ctrlUsers.updateAddress);

router.get('/categories', ctrlCategories.getCategories);
router.post('/categories', ctrlCategories.createCategory);

router.get('/products', ctrlProducts.getProducts);
router.post('/products', ctrlProducts.createProduct);
router.put('/availability/:productid', ctrlProducts.updateAvailability);

router.get('/productimages/:productid', ctrlProductImages.getProductImages);
router.post('/productimages/:productid', ctrlProductImages.createProductImageURL);

router.get('/comments/:productid', ctrlComments.getProductComments);
router.post('/comments/:productid', ctrlComments.createComment);
router.delete('/comments/:commentid', ctrlComments.deleteComment);

router.post('/chats/:userid', ctrlChats.sendMessage);
router.get('/chats/:userid', ctrlChats.getMessages);

module.exports = router;
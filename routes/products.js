// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {check, validationResult, body} = require ('express-validator');
let validatorMiddleware = require ('../middlewares/validatorMiddleware');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ Multer ************

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp/fotoProducto')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
});

var upload = multer({ storage: storage });

router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:productId/:productCategory', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/create', upload.any(), validatorMiddleware, productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
router.put('/edit/:productId', upload.any(), validatorMiddleware, productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;

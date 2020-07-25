// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.listado); /* GET - home page */

module.exports = router;
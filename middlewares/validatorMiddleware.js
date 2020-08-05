const {check, validationResult, body} = require('express-validator');
var multer = require('multer');
const path = require ('path');


let validatorProductMiddleware =
[
    check('name')
        .isLength({min:3}).withMessage('El campo "Nombre" debe tener al menos 3 caracteres.')
        .trim(), //Eliminamos los espacios en blanco laterales
    check('description')
        .isLength({min:10}).withMessage('El campo "Descripción" debe estar completo y tener al menos 10 caracteres.'),
    check('price')
        .isLength({min:1}).withMessage('El campo "Precio" debe estar completo'),
    check('discount')
        .isLength({min:1}).withMessage('El campo "Descuento" debe estar completo'),
]

  module.exports = validatorProductMiddleware
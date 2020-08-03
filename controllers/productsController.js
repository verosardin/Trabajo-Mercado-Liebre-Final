const fs = require('fs');
const path = require('path');
const db = require('../database/models');
const {check, validationResult, body} = require ('express-validator');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));


const controller = {
	// Root - Show all products
	root: (req, res) => {
		db.Productos.findAll()
		.then(function(productos){
			res.render("products", {products:productos, toThousand, formatPrice})
		})
		.catch(function(e){
			console.log(e)
		});
	},

	// Detail - Detail from one product
	detail: (req,res) => {
			db.Productos.findByPk(req.params.productId)
			.then(function(producto){
				if(producto.category == req.params.productCategory){
					res.render("detail",{product: producto, toThousand, formatPrice});
					} else {
						res.render("error");
					}
			})
			.catch(function(e){
				console.log(e)
			});
    },

	// Create - Form to create
	create: (req, res) => {
		res.render("product-create-form");
	},

	// Create -
	store: (req, res, next) => {
		let errors = validationResult(req); // chequeo si existen errores de validación
		if (req.files.length > 0) { // si se subió una imagen de perfil
			let extension = path.extname(req.files[0].originalname)
                        let validado = false;
                        switch(extension){ // validamos la extensión
                        case '.jpg':
                            validado = true;
                            break;
                        case '.jpeg':
                            validado = true;
                            break;
                        case '.png':
                            validado = true;
                            break;
                        default:
                            validado = false;
					}

					if (validado == false) {
                        let nuevoError = { // Creo un nuevo error
                           value: '',
                           msg: 'Debe subir una imagen de perfil con extensión válida (jpg, jpeg o png).',
                           param: 'file',
                           location: 'files'
                    	}
                        errors.errors.push(nuevoError); // lo agregamos a la lista de errores
						}
				} else {
					let nuevoError = {
                        value: '',
                        msg: 'Es obligatorio subir una imagen de perfil (jpg, jpeg o png).',
                        param: 'avatar',
                        location: 'files'
                        }
                         errors.errors.push(nuevoError);
                    	}

			if (errors.isEmpty()){

				db.Productos.create({
					name: req.body.name,
					description: req.body.description,
					price: parseFloat(req.body.price),
					image: req.files[0].filename,
					category: req.body.category,
					discount: parseFloat(req.body.discount),
				})
				.then(function(producto){
					res.redirect("/products")
				})
				.catch(function(e){
				console.log(e)
				});
			} else {
				res.render("product-create-form", {errors: errors.errors});
			}
	},

	// Update - Form to edit
	edit: (req, res) => {
			db.Productos.findByPk(req.params.productId)
			.then(function(producto){
				res.render("product-edit-form", {productToEdit: producto});
			})
	},
	// Update - Method to update
	update: (req, res, next) => {
		let errors = validationResult(req); // chequeo si existen errores de validación
		if (req.files.length > 0) { // si se subió una imagen de perfil
			let extension = path.extname(req.files[0].originalname)
                        let validado = false;
                        switch(extension){ // validamos la extensión
                        case '.jpg':
                            validado = true;
                            break;
                        case '.jpeg':
                            validado = true;
                            break;
                        case '.png':
                            validado = true;
                            break;
                        default:
                            validado = false;
					}

					if (validado == false) {
                        let nuevoError = { // Creo un nuevo error
                           value: '',
                           msg: 'Debe subir una imagen de perfil con extensión válida (jpg, jpeg o png).',
                           param: 'file',
                           location: 'files'
                    	}
                        errors.errors.push(nuevoError); // lo agregamos a la lista de errores
						}
				} else {
					let nuevoError = {
                        value: '',
                        msg: 'Es obligatorio subir una imagen de perfil (jpg, jpeg o png).',
                        param: 'avatar',
                        location: 'files'
                        }
                         errors.errors.push(nuevoError);
                    	}

			if (errors.isEmpty()){
				db.Productos.update({
					name: req.body.name,
					description: req.body.description,
					price: parseFloat(req.body.price),
					image: req.files[0].filename,
					category: req.body.category,
					discount: parseFloat(req.body.discount),
			}, {
				where: {
					id: req.params.productId
				}
			})
			.then(function(){
				res.redirect("/products");
			})
			.catch(function(e){
				console.log(e)
			})
		} else {
			db.Productos.findByPk(req.params.productId)
			.then(function(producto){
				res.render("product-edit-form", {productToEdit: producto, errors: errors.errors});
			})
		}
	},


	// Delete - Delete one product from DB (Falta agregar un boton para eliminar a los productos).
	destroy : (req, res, next) => {
		db.Productos.destroy({
			where: {id: req.params.productId}
		})
			.then(function(){
				res.redirect("/products");
			})
			.catch(function(e){
				console.log(e)
			})
	}
}

module.exports = controller;
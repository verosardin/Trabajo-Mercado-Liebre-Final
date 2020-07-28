const fs = require('fs');
const path = require('path');
const db = require('../database/models');

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
		console.log('aca')
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
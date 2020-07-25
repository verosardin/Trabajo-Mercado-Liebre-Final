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

	// Create - ACÁ FALTA EL TEMA DE LA IMAGEN
	store: (req, res) => {
		console.log("Estoy aquí")
		db.Productos.create({
			name: req.body.name,
			description: req.body.description,
			price: parseFloat(req.body.price),
			image: "imagen",
			category: req.body.category,
			discount: parseFloat(req.body.discount),
		})
		.then(function(){
			res.send("Agregado!")
		})
		.catch(function(e){
			console.log(e)
		});
	},

	// Update - Form to edit
	edit: (req, res) => {
		const productToEdit = products.find(item => item.id == req.params.productId);
		res.render("product-edit-form", {productToEdit});
	},
	// Update - Method to update
	update: (req, res) => {
		let productEdited = null;
		products.forEach(product => {
			if(product.id == req.params.productId) {
				product.name = req.body.name;
				product.price = parseFloat(req.body.price);
				product.discount = parseFloat(req.body.discount);
				product.category = req.body.category;
				product.description = req.body.description;
				productEdited = product;
			}
		});
		saveProducts(products);
		res.send("Editado!");
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const productsNew = products.filter(product => product.id != req.params.productId);
		saveProducts(productsNew);
		res.send("Eliminado!");
	}
};

module.exports = controller;
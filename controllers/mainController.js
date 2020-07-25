const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => toThousand(Math.round(price*(1-(discount/100))));

const controller = {
	root: (req, res) => {
		db.Productos.findAll()
		.then(function(productos){
			const productsVisited = productos.filter(product => product.category === "visited");
			const productsInSale = productos.filter(product => product.category === "in-sale");
			res.render("index", {productsVisited, productsInSale, formatPrice});
		})
		.catch(function(e){
			console.log(e)
		});
	},

	search: (req, res) => {
		db.Productos.findAll()
		.then(function(productos){
			let results = [];
			productos.forEach((prod, i) => {
				if (prod.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()) || prod.description.toLowerCase().includes(req.query.keywords.toLowerCase().trim())) {
				results.push(prod);
				}
			});
			if (results !== []){
			res.render('results', {results: results, toThousand, formatPrice, search: req.query.keywords});
			}
		})
		.catch(function(e){
			console.log(e)
		});
	},

	offers: (req,res) => {
		db.Productos.findAll({
			where: {category: "in-sale"}
		})
		.then(function(productos){
		res.render("offers", {products: productos, toThousand, formatPrice})
		})
		.catch(function(e){
			console.log(e)
		});
	},
};

module.exports = controller;

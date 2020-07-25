const db = require('../database/models');


const usuariosController = {

    listado: function(req,res){

    db.Usuarios.findAll()
    .then(function(usuarios){
    res.render("usuarios", {usuarios: usuarios});
    })
    }

    }

module.exports = usuariosController;
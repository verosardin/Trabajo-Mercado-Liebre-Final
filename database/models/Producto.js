module.exports = (sequelize, dataTypes) => {

let alias = 'Productos';
let cols = {
id: {
    primaryKey: true,
    type: dataTypes.INTEGER,
    autoIncrement: true,
},
name: {
    type: dataTypes.STRING,
    allowNull: false,
},
description: {
    type: dataTypes.STRING,
    allowNull: false,
},
price: {
    type:dataTypes.DOUBLE,
    allowNull: false
},
image:{
    type:dataTypes.STRING,
    allowNull: false
},
category:{
    type:dataTypes.STRING,
    allowNull: false
},
discount:{
    type:dataTypes.INTEGER,
    allowNull: false
},
};


let config={
    tableName:"productos",
    timestamps:false
    };

const Producto= sequelize.define(alias, cols, config);

Producto.associate = function(models){
Producto.belongsToMany(models.Usuarios, {
    as: "productos",
    through: "usuario_producto",
    foreignKey: "id_producto",
    otherKey: "id_usuario",
    timestamps: false,
})
}

return Producto;
}
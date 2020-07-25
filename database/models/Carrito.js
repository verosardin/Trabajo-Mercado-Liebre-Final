module.exports = (sequelize, dataTypes) => {

    let alias = 'Carrito';
    let cols = {
    id: {
    type: dataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    },
    cantidad: {
    type: dataTypes.INTEGER,
    allowNull: false,
    },
    };

    let config={
        tableName:"usuario_producto",
        timestamps:false
        };

    const Carrito= sequelize.define(alias, cols, config);
    return Carrito;
    }
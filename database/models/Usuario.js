module.exports = (sequelize, dataTypes) => {

    let alias = 'Usuarios';
    let cols = {
    email: {
    type: dataTypes.STRING,
    primaryKey: true,
    },
    nombre: {
    type: dataTypes.STRING,
    allowNull: false,
    },
    apellido: {
    type: dataTypes.STRING,
    allowNull: false,
    },
    contraseña:{
    type: dataTypes.STRING,
    allowNull: false,
    },
    };

    let config={
        tableName:"usuarios",
        timestamps:false
        };

    const Usuario= sequelize.define(alias, cols, config);

    Usuario.associate = function(models){
        Usuario.belongsToMany(models.Productos,{
        as: "usuarios",
        through: "usuario_producto",
        foreignKey: "id_usuario",
        otherKey: "id_producto",
        timestamps: false,
        })
        }

    return Usuario;
    }
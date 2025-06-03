const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Receta_Ingredientes = require('./Receta_Ingredientes');

const Ingredientes = sequelize.define('ingredientes', {
    id_ingrediente:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    nombre:{type:DataTypes.STRING(20),unique:true},
    cantidad:DataTypes.DECIMAL(6,3),
    unidad_medida:DataTypes.STRING(2),
    costo:DataTypes.DECIMAL(6,2),
    id_usuario:{
        type:DataTypes.INTEGER,
        references:{model:'usuarios',key:'id_usuario'},
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    }
}, {
    timestamps: false
});

Ingredientes.associate = function(models) {
    Ingredientes.belongsToMany(models.Recetas, {
        through: models.Receta_Ingredientes,
        foreignKey: 'id_ingrediente',
        otherKey: 'id_receta',
        as: 'recetas'
    });
};

module.exports = Ingredientes;
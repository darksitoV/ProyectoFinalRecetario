const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');
const Receta_Ingredientes = require('./Receta_Ingredientes'); // Importa el modelo intermedio

const Recetas = sequelize.define('recetas', {
    id_receta:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_usuario:{
        type:DataTypes.STRING,
        references:{model:'usuarios',key:'id_usuario'},
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    nombre_receta:{type:DataTypes.STRING,unique:true},
    tiempo_realizacion:{type:DataTypes.INTEGER},
    precio_estimado:{type:DataTypes.DECIMAL(6,2)},
    instrucciones:{type:DataTypes.STRING}
}, {
    timestamps: false,
    tableName: 'recetas',
    freezeTableName: true
});

Recetas.associate = function(models) {
    Recetas.belongsToMany(models.Ingredientes, {
        through: models.Receta_Ingredientes,
        foreignKey: 'id_receta',
        otherKey: 'id_ingrediente',
        as: 'ingredientes'
    });
};

module.exports = Recetas;
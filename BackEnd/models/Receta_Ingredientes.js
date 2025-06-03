const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Receta_Ingredientes = sequelize.define('receta_ingredientes', {
    id_receta_ingredientes: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_receta: {
        type: DataTypes.INTEGER,
        references: { model: 'recetas', key: 'id_receta' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_ingrediente: {
        type: DataTypes.INTEGER,
        references: { model: 'ingredientes', key: 'id_ingrediente' },
    },
    cantidad: { type: DataTypes.DECIMAL(6, 3) }
}, {
    timestamps: false
});

module.exports = Receta_Ingredientes;
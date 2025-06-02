const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const recetas_ingredientes = sequelize.define('receta_ingredientes', {
    id_receta_ingredientes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_receta: {
        type: DataTypes.INTEGER,
        references: {
            model: 'recetas',  // Asegúrate que coincida exactamente con el nombre de tu tabla
            key: 'id_receta'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    id_ingrediente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'ingredientes',  // Asegúrate que coincida exactamente con el nombre de tu tabla
            key: 'id_ingrediente'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    cantidad: {
        type: DataTypes.DECIMAL(6, 3),
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'receta_ingredientes',  // Nombre exacto de la tabla en la base de datos
    freezeTableName: true 
});

module.exports = recetas_ingredientes;
const { DataTypes} = require('sequelize')
const sequelize= require('../conexion')

const recetas_ingredientes=sequelize.define('recetas_ingredientes',{
    id_receta_ingredientes:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_receta:{
        type:DataTypes.INTEGER,
        references:{model:'recetas',key:'id_receta'},
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    },
    id_ingrediente:{
        type:DataTypes.INTEGER,
        references:{model:'ingredientes',key:'id_ingrediente'},
    },
    cantidad:{type:DataTypes.DECIMAL(6,3)}
},{
    timestamps:false //NO mapear createAt y UpdateAt
})

module.exports=recetas_ingredientes;
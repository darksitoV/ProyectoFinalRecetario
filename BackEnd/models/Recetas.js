const { DataTypes} = require('sequelize')
const sequelize= require('../conexion')

const recetas=sequelize.define('recetas',{
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
},{
    timestamps:false //NO mapear createAt y UpdateAt
})

module.exports=recetas;
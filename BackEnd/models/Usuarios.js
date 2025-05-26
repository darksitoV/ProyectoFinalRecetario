const { DataTypes} = require('sequelize')
const sequelize= require('../conexion')

const usuarios=sequelize.define('usuarios',{
    id_usuario:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    usuario:{type:DataTypes.STRING(20), unique:true},
    nombre_usuario:{type:DataTypes.STRING(50)},
    apellido_usuario:{type:DataTypes.STRING(50)},
    fecha_nacimiento:{type:DataTypes.STRING},
    correo:{type:DataTypes.STRING,unique:true},
    contraseña:{type:DataTypes.STRING},
    rol:{type:DataTypes.STRING(10)}
},{
    timestamps:false //NO mapear createAt y UpdateAt
})

module.exports=usuarios;

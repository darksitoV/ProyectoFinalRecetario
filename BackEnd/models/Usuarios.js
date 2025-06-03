const { DataTypes} = require('sequelize')
const sequelize= require('../conexion')

const Usuarios=sequelize.define('usuarios',{
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


// Asociación: Un usuario tiene muchas recetas e ingredientes
Usuarios.associate = function(models) {
    Usuarios.hasMany(models.Recetas, {
        foreignKey: 'id_usuario',
        as: 'recetas'
    });
    Usuarios.hasMany(models.Ingredientes, {
        foreignKey: 'id_usuario',
        as: 'ingredientes'
    });
};
module.exports=Usuarios;

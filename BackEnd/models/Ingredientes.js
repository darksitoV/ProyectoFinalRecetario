const { DataTypes} = require('sequelize')
const sequelize= require('../conexion')

const Ingredientes=sequelize.define('ingredientes',{
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
},{
    timestamps:false //NO mapear createAt y UpdateAt
})

Ingredientes.associate = function(models) {
  Ingredientes.belongsToMany(models.Recetas, {
    through: models.recetas_ingredientes,
    foreignKey: 'id_ingrediente',
    otherKey: 'id_receta'
  });
};

module.exports=Ingredientes;
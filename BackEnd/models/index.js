const Recetas = require('./Recetas');
const Ingredientes = require('./Ingredientes');
const Receta_Ingredientes = require('./Receta_Ingredientes');
const Usuarios= require('./Usuarios');
Recetas.associate({ Ingredientes, Receta_Ingredientes });
Ingredientes.associate({ Recetas, Receta_Ingredientes });
Usuarios.associate({Ingredientes, Recetas});
module.exports = { Usuarios, Recetas, Ingredientes, Receta_Ingredientes };
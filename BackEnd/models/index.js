const Recetas = require('./Recetas');
const Ingredientes = require('./Ingredientes');
const Receta_Ingredientes = require('./Receta_Ingredientes');

Recetas.associate({ Ingredientes, Receta_Ingredientes });
Ingredientes.associate({ Recetas, Receta_Ingredientes });

module.exports = { Recetas, Ingredientes, Receta_Ingredientes };
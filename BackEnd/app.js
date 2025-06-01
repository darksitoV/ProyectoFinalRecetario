const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
// Importar el modelo de la BD
const Usuarios=require('./models/Usuarios')
const Ingredientes=require('./models/Ingredientes')
const Recetas=require('./models/Recetas')
const Receta_Ingredientes=require('./models/Receta_Ingredientes')
const app = express()
const puerto = 3000

app.use(cors());
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.post('/login', async (req, res) => {
    try {
        const { usuario, contraseña } = req.body;
        // Validación básica
        if (!usuario || !contraseña) {
            return res.status(400).json({ 
                error: 'Correo y contraseña son requeridos' 
            });
        }
        // Buscar usuario solo por correo
        const buscarUsuario = await Usuarios.findOne({ 
            where: { usuario } 
        });
        // Respuesta genérica por seguridad (no revelar si el usuario existe)
        if (!buscarUsuario) {
            return res.status(401).json({ 
                error: 'Credenciales inválidas' 
            });
        }
        if (contraseña!=buscarUsuario.contraseña) {
            return res.status(401).json({ 
                error: 'Contraseña inválida' 
            });
        }
        res.send(buscarUsuario);
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor' 
        });
    }
});
app.post('/:id_usuario/gestion_ingredientes', async (req, res) => {
    try {
        const ingredientes = req.body; // Ahora espera un array
        const { id_usuario } = req.params;

        // Validar que el body sea un array
        if (!Array.isArray(ingredientes)) {
            return res.status(400).json({ 
                error: "Se esperaba un array de ingredientes" 
            });
        }

        // Validar cada ingrediente
        for (const ing of ingredientes) {
            if (!ing.nombre || !ing.cantidad || !ing.unidad_medida || !ing.costo) {
                return res.status(400).json({ 
                    error: `Faltan campos en el ingrediente: ${ing.nombre || 'sin nombre'}` 
                });
            }
            if (isNaN(ing.cantidad) || isNaN(ing.costo)) {
                return res.status(400).json({ 
                    error: `Cantidad o costo no son números en: ${ing.nombre}` 
                });
            }
        }

        // Verificar si algún ingrediente ya existe (opcional)
        for (const ing of ingredientes) {
            const existe = await Ingredientes.findOne({ 
                where: { nombre: ing.nombre, id_usuario } 
            });
            if (existe) {
                return res.status(409).json({ 
                    error: `El ingrediente "${ing.nombre}" ya existe` 
                });
            }
        }

        // Insertar todos los ingredientes (usando bulkCreate)
        const nuevosIngredientes = await Ingredientes.bulkCreate(
            ingredientes.map(ing => ({
                id_usuario,
                nombre: ing.nombre,
                cantidad: parseFloat(ing.cantidad),
                unidad_medida: ing.unidad_medida,
                costo: parseFloat(ing.costo)
            }))
        );

        // Respuesta exitosa
        return res.status(201).json({
            mensaje: `${ingredientes.length} ingredientes guardados correctamente`,
            datos: nuevosIngredientes
        });

    } catch (error) {
        console.error('Error al guardar ingredientes:', error);
        return res.status(500).json({ 
            error: 'Error interno del servidor' 
        });
    }
});


app.post('/:id_usuario/gestion_ingredientes',async (req,res)=>{
    try {

        const {nombre,cantidad,unidad_medida,costo}= req.body;
        const {id_usuario}=req.params;
        // Buscar si el Ingrediente existe
        const ingrediente = await Ingredientes.findOne({ 
            where: { nombre } 
        });
        if (ingrediente) {
                return res.status(409).json({ 
                    error: "El ingrediente ya está registrado" 
                });
        }
        //Agregar Ingrediente
        const nuevoIngrediente = await Ingredientes.create({id_usuario,nombre,cantidad,unidad_medida,costo});
        //Respuesta 
        res.status(201).json({
            nombre,cantidad,unidad_medida,costo,
            mensaje: "Usuario registrado exitosamente"
        });
    } catch (error) {
        console.error('Error al agregar ingrediente:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor' 
        });
    }
})

app.get('/ver_ingredientes',async (req,res)=>{
    try {
        ingredientes=await Ingredientes.findAll({
            attributes:['nombre','cantidad','unidad_medida','costo']
        });
        res.send(ingredientes);
    } catch (error) {
        console.error('Error al mostrar ingrediente:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor' 
        });
    }
})
// Crear una nueva receta con ingredientes
app.post('/recetas', async (req, res) => {
  try {
    const { receta, ingredientes } = req.body;
    
    // Crear la receta
    const nuevaReceta = await Recetas.create(receta);
    
    // Agregar ingredientes si existen
    if (ingredientes && ingredientes.length > 0) {
      const ingredientesConIdReceta = ingredientes.map(ing => ({
        ...ing,
        id_receta: nuevaReceta.id_receta
      }));
      
      await RecetasIngredientes.bulkCreate(ingredientesConIdReceta);
    }
    
    // Obtener la receta completa con sus ingredientes para la respuesta
    const recetaCompleta = await Recetas.findByPk(nuevaReceta.id_receta, {
      include: [RecetasIngredientes]
    });
    
    res.status(201).json(recetaCompleta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las recetas con sus ingredientes
app.get('/recetas', async (req, res) => {
  try {
    const recetas = await Recetas.findAll({
      include: [RecetasIngredientes]
    });
    res.json(recetas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una receta específica con sus ingredientes
app.get('/recetas/:id_receta', async (req, res) => {
  try {
    const receta = await Recetas.findByPk(req.params.id_receta, {
      include: [RecetasIngredientes]
    });
    
    if (!receta) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    res.json(receta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una receta y sus ingredientes
app.put('/recetas/:id_receta', async (req, res) => {
  try {
    const { receta, ingredientes } = req.body;
    const{id_receta}=req.params;
    // Actualizar la receta
    const [updated] = await Recetas.update(receta, {
      where: { id_receta }
    });
    
    if (!updated) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    // Eliminar ingredientes existentes y agregar los nuevos
    if (ingredientes) {
      await RecetasIngredientes.destroy({
        where: { id_receta }
      });
      
      if (ingredientes.length > 0) {
        const ingredientesConIdReceta = ingredientes.map(ing => ({
          ...ing,
          id_receta
        }));
        
        await RecetasIngredientes.bulkCreate(ingredientesConIdReceta);
      }
    }
    
    // Obtener la receta actualizada para la respuesta
    const recetaActualizada = await Recetas.findByPk(id_receta, {
      include: [RecetasIngredientes]
    });
    
    res.json(recetaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una receta (los ingredientes se eliminarán automáticamente por CASCADE)
app.delete('/recetas/:id', async (req, res) => {
  try {
    const deleted = await Recetas.destroy({
      where: { id_receta: req.params.id }
    });
    
    if (!deleted) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

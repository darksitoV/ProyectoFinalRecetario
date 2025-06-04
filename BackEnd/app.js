const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const { Op } = require('sequelize'); // Importar Op para operaciones con Sequelize
// Importar el modelo de la BD
const { Usuarios, Recetas, Ingredientes, Receta_Ingredientes } = require('./models/index'); // Importar los modelos
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
app.post('/agregar_usuario', async (req, res) => {
    try {
        const {usuario,nombre_usuario,apellido_usuario,fecha_nacimiento,correo,contraseña,rol}=req.body;
        // 1. Validar campos requeridos
        if (!usuario || !nombre_usuario || !apellido_usuario || !fecha_nacimiento || !correo || !contraseña || !rol) {
            return res.status(400).json({ 
                error: "Todos los campos (correo, contraseña, rol) son obligatorios" 
            });
        }
        // 2. Validar formato de correo (opcional pero recomendado)
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            return res.status(400).json({ 
                error: "Formato de correo inválido" 
            });
        }
        // 3. Verificar si el usuario ya existe
        const usuarioExistente=await Usuarios.findOne({
            where:{usuario}
        })
        if (usuarioExistente) {
            return res.status(409).json({ 
                error: "El usuario ya está registrado" 
            });
        }
        const correoExistente = await Usuarios.findOne({ 
            where: { correo } 
        });
        if (correoExistente) {
            return res.status(409).json({ 
                error: "El correo ya está registrado" 
            });
        }
        // 4. Crear usuario
        const nuevoUsuario = await Usuarios.create({usuario,nombre_usuario,apellido_usuario,fecha_nacimiento,correo,contraseña,rol});
        // 5. Respuesta sin datos sensibles
         return res.status(201).json({
            usuario,nombre_usuario,correo,rol,
            mensaje: "Usuario registrado exitosamente"
        });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        // Manejo de errores de Sequelize
        if (error.name === "SequelizeValidationError") {
            const errores = error.errors.map(err => ({
                campo: err.path,
                mensaje: err.message
            }));
            return res.status(400).json({ errores });
        }
        res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

app.put('/actualizar_nombreUsuario/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario } = req.body;

        // Validar que el nuevo nombre de usuario no esté vacío
        if (!usuario) {
            return res.status(400).json({ 
                error: "El nuevo nombre de usuario es obligatorio" 
            });
        }

        // Buscar el usuario por ID
        const nombre_usuario = await Usuarios.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ 
                error: "Usuario no encontrado" 
            });
        }

        // Actualizar el nombre de usuario
        nombre_usuario.usuario = usuario;
        await nombre_usuario.save();

        res.json({ 
            mensaje: "Nombre de usuario actualizado correctamente", 
            usuario: { id: usuario.id, nombre_usuario: nombre_usuario.usuario } 
        });
    } catch (error) {
        console.error('Error al actualizar nombre de usuario:', error);
        res.status(500).json({ 
            error: "Error interno del servidor" 
        });
    }
});

app.put('/actualizar_correo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevoCorreo } = req.body;

    // Validar que el nuevo correo no esté vacío
    if (!nuevoCorreo) {
      return res.status(400).json({
        error: "El nuevo correo es obligatorio"
      });
    }

    // Validar formato de correo
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nuevoCorreo)) {
      return res.status(400).json({
        error: "Formato de correo inválido"
      });
    }

    // Buscar el usuario por ID
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Actualizar el correo
    usuario.correo = nuevoCorreo;
    await usuario.save();

    res.json({
      mensaje: "Correo actualizado correctamente",
      usuario: { id: usuario.id, correo: usuario.correo }
    });
  } catch (error) {
    console.error('Error al actualizar correo:', error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  }
});

app.put('/actualizar_contraseña/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nuevaContraseña } = req.body;

    // Validar que la nueva contraseña no esté vacía
    if (!nuevaContraseña) {
      return res.status(400).json({
        error: "La nueva contraseña es obligatoria"
      });
    }

    // Buscar el usuario por ID
    const usuario = await Usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Actualizar la contraseña
    usuario.contraseña = nuevaContraseña;
    await usuario.save();

    res.json({
      mensaje: "Contraseña actualizada correctamente",
      usuario: { id: usuario.id, correo: usuario.correo }
    });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    res.status(500).json({
      error: "Error interno del servidor"
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

// Ver ingredientes de un usuario específico
app.get('/:id/ver_ingredientes',async (req,res)=>{
  try {
    const { id } = req.params;
    
    // Buscar ingredientes del usuario
    const ingredientes = await Ingredientes.findAll({
      where: { id_usuario: id }
    });
    
    if (ingredientes.length === 0) {
      return res.status(404).json({ 
        mensaje: "No se encontraron ingredientes para este usuario" 
      });
    }
    
    return res.json(ingredientes);
  } catch (error) {
    console.error('Error al obtener ingredientes:', error);
    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
})

app.put('/:idUser/:idIngredient/ingredientes', async (req, res) => {
  try {
    const { idUser, idIngredient } = req.params;
    const { nombre, cantidad, unidad_medida, costo } = req.body;

    // 1. Actualizar el ingrediente
    const actualizado = await Ingredientes.update(
      { nombre, cantidad, unidad_medida, costo },
      { where: { id_ingrediente: idIngredient, id_usuario: idUser } }
    );

    // 2. Buscar todas las recetas que usan este ingrediente
    const relaciones = await Receta_Ingredientes.findAll({
      where: { id_ingrediente: idIngredient }
    });

    // 3. Para cada receta, recalcular el precio_estimado
    for (const rel of relaciones) {
      const id_receta = rel.id_receta;

      // Obtener todos los ingredientes de la receta
      const ingredientesReceta = await Receta_Ingredientes.findAll({
        where: { id_receta }
      });

      let nuevoCosto = 0;
      for (const ingRel of ingredientesReceta) {
        const ingrediente = await Ingredientes.findByPk(ingRel.id_ingrediente);
        if (ingrediente) {
          // Si el costo es unitario, solo multiplica:
          nuevoCosto += parseFloat(ingrediente.costo) * parseFloat(ingRel.cantidad);
        }
      }

      // Actualizar el precio_estimado de la receta
      await Recetas.update(
        { precio_estimado: nuevoCosto },
        { where: { id_receta } }
      );
    }

    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/:iduser/ingredientes/:idingredient', async (req, res) => {
  try {
    const { iduser, idingredient } = req.params;

    // 1. Buscar todas las recetas asociadas a este ingrediente
    const relaciones = await Receta_Ingredientes.findAll({
      where: { id_ingrediente: idingredient }
    });

    // 2. Para cada receta, recalcular el costo
    for (const rel of relaciones) {
      const id_receta = rel.id_receta;

      // Obtener todos los ingredientes restantes de la receta (excluyendo el que se va a borrar)
      const ingredientesRestantes = await Receta_Ingredientes.findAll({
        where: { 
          id_receta, 
          id_ingrediente: { [Op.ne]: idingredient } // <-- Aquí está el cambio clave
        }
      });

      // Sumar el costo de los ingredientes restantes
      let nuevoCosto = 0;
      for (const ingRel of ingredientesRestantes) {
        const ingrediente = await Ingredientes.findByPk(ingRel.id_ingrediente);
        if (ingrediente) {
          // Si el costo es total, calcula el unitario:
          nuevoCosto += parseFloat(ingrediente.costo) * parseFloat(ingRel.cantidad);
        }
      }

      // Actualizar el precio_estimado de la receta
      await Recetas.update(
        { precio_estimado: nuevoCosto },
        { where: { id_receta } }
      );
      const recetaActualizada = await Recetas.findByPk(id_receta);
      console.log(`Receta ${id_receta} nuevo precio_estimado:`, recetaActualizada.precio_estimado);
    }

    // 3. Eliminar relaciones y el ingrediente
    await Receta_Ingredientes.destroy({
      where: { id_ingrediente: idingredient }
    });
    const deleted = await Ingredientes.destroy({
      where: { id_ingrediente: idingredient, id_usuario: iduser }
    });

    if (!deleted) {
      return res.status(404).json({ error: 'ingrediente no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva receta con ingredientes
app.post('/:id/recetas', async (req, res) => {
    try {
      const { receta, ingredientes } = req.body;
    const { id } = req.params;

    // Validar campos requeridos
    if (!receta || !ingredientes || !receta.nombre_receta || !receta.tiempo_realizacion || !receta.precio_estimado || !receta.instrucciones) {
      return res.status(400).json({ 
        error: "Todos los campos de la receta son obligatorios" 
      });
    }

    // Crear la receta
    const nuevaReceta = await Recetas.create({
      ...receta,
      id_usuario: id
    });

    const conocerIdReceta = await Recetas.findOne({
      where: { id_usuario: id, nombre_receta: receta.nombre_receta }
    });

    // Validar ingredientes
    if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
      return res.status(400).json({ 
        error: "Se requiere al menos un ingrediente" 
      });
    }

    // Preparar los datos de los ingredientes para insertar
    const ingredientesConIdReceta = ingredientes.map(ing => ({
      id_receta: conocerIdReceta.id_receta,
      id_ingrediente: ing.id_ingrediente,
      cantidad: ing.cantidad
    }));

    // Insertar los ingredientes asociados a la receta
    console.log('Insertando en receta_ingredientes:', ingredientesConIdReceta);
    await Receta_Ingredientes.bulkCreate(ingredientesConIdReceta);

    res.status(201).json(receta,ingredientes);
    } catch (error) {
      console.error('Error al crear receta:', error);
      res.status(500).json({ error: error.message });
    }
});

// Obtener todas las recetas con sus ingredientes
app.get('/:id/recetas', async (req, res) => {
  try {
    const { id } = req.params;

    const recetas = await Recetas.findAll({
      where: { id_usuario: id },
      include: [
        {
          model: Ingredientes,
          as: 'ingredientes',
          through: { attributes: [] }
        }
      ]
    });

    res.json(recetas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// Obtener una receta específica con sus ingredientes
app.get('/recetas/:id_receta', async (req, res) => {
  try {
    const receta = await Recetas.findByPk(req.params.id_receta, {
      include: [recetas_ingredientes]
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
    const { id_receta } = req.params;

    // 1. Actualizar la receta (sin ingredientes)
    const [updated] = await Recetas.update(receta, {
      where: { id_receta }
    });

    if (!updated) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }

    // 2. Actualizar ingredientes asociados a la receta
    if (ingredientes) {
      await Receta_Ingredientes.destroy({
        where: { id_receta }
      });

      if (ingredientes.length > 0) {
        const ingredientesConIdReceta = ingredientes.map(ing => ({
          ...ing,
          id_receta
        }));
        await Receta_Ingredientes.bulkCreate(ingredientesConIdReceta);
      }
    }

    // 3. Recalcular el precio_estimado de la receta
    const ingredientesReceta = await Receta_Ingredientes.findAll({
      where: { id_receta }
    });

    let nuevoCosto = 0;
    for (const ingRel of ingredientesReceta) {
      const ingrediente = await Ingredientes.findByPk(ingRel.id_ingrediente);
      if (ingrediente) {
        // Si el costo es unitario, solo multiplica:
        nuevoCosto += parseFloat(ingrediente.costo) * parseFloat(ingRel.cantidad);
      }
    }

    await Recetas.update(
      { precio_estimado: nuevoCosto },
      { where: { id_receta } }
    );

    res.json({
      mensaje: "Receta actualizada correctamente",
      receta: { id_receta, ...receta ,ingredientes}
    });
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

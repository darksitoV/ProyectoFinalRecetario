import './RegisterRecipe.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import BackButton from '../../Components/Back-Button/Back-Button';

function RegisterRecipe() {
  const { user } = useAuth();

  const [receta, setReceta] = useState({
    nombre_receta: '',
    tiempo_realizacion: 30,
    ingredientes: [],
    instrucciones: '',
    precio_estimado: 0
  });

  const [ingredientesDB, setIngredientesDB] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarLista, setMostrarLista] = useState(false);

  const [nuevoIngrediente, setNuevoIngrediente] = useState({
    id_ingrediente: '',
    nombre: '',
    unidad_medida: '',
    cantidad: '',
    costo: ''
  });

  useEffect(() => {
    const obtenerIngredientes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/${user.id}/ver_ingredientes`);
        const data = await res.json();
        console.log("Ingredientes recibidos:", data); // <-- AÑADE ESTA LÍNEA
        setIngredientesDB(data);
      } catch (error) {
        console.error('Error al obtener ingredientes:', error);
      }
    };

    obtenerIngredientes();
  }, [user.id]);

  const ingredientesFiltrados = Array.isArray(ingredientesDB)
    ? ingredientesDB.filter((ing) =>
        ing.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  const seleccionarIngrediente = (ing) => {
    setNuevoIngrediente({
      id_ingrediente: ing.id_ingrediente,
      nombre: ing.nombre,
      unidad_medida: ing.unidad_medida,
      cantidad: '',
      costo: ing.costo
    });
    setBusqueda(ing.nombre);
    setMostrarLista(false);
  };

  const agregarIngrediente = () => {
    const cantidad = parseFloat(nuevoIngrediente.cantidad);
    const costo = parseFloat(nuevoIngrediente.costo);
    if (!cantidad || !nuevoIngrediente.nombre) return;

    const nuevo = {
      ...nuevoIngrediente,
      cantidad: cantidad.toString()
    };

    setReceta((prev) => ({
      ...prev,
      ingredientes: [...prev.ingredientes, nuevo],
      precio_estimado: prev.precio_estimado + cantidad * costo
    }));

    setNuevoIngrediente({ nombre: '', unidad_medida: '', cantidad: '', costo: '' });
    setBusqueda('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeData = {
      receta: {
        nombre_receta: receta.nombre_receta,
        tiempo_realizacion: Number(receta.tiempo_realizacion),
        instrucciones: receta.instrucciones,
        precio_estimado: Number(receta.precio_estimado)
      },
      ingredientes: receta.ingredientes
    }

    try {
      console.log(recipeData)
      const response = await fetch(`http://localhost:3000/${user.id}/recetas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Receta guardada exitosamente:', data);
        alert('¡Receta guardada!');
        // Opcional: Redirigir o limpiar el formulario
        setReceta({
          nombre_receta: '',
          tiempo_realizacion: 30,
          ingredientes: [],
          instrucciones: '',
          precio_estimado: 0
        });
      } else {
        console.error('Error del servidor:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      alert('Ocurrió un error al intentar guardar la receta');
    }
  };


  return (
    <>
      <div className='container_new_recipe'>
        <h1 className='conteiner_title_newRecipe'>Nueva Receta</h1>
        <form className='conteiner_form_newRecipe' onSubmit={handleSubmit}>
          <div className='back_button_wrapper'>
            <BackButton />
          </div>
          <div className='form_group'>
            <label>Nombre de la receta:</label>
            <input
              type="text"
              className='input_form_newRecipe'
              value={receta.nombre_receta}
              onChange={(e) => setReceta({ ...receta, nombre_receta: e.target.value.toUpperCase()})}
              required
            />
          </div>

          <div className='form_group'>
            <label>Tiempo de preparación (min):</label>
            <input
              type="number"
              className='input_form_newRecipe'
              value={receta.tiempo_realizacion}
              onChange={(e) => setReceta({ ...receta, tiempo_realizacion: e.target.value })}
              required
            />
          </div>

          <div className='form_group'>
            <label>Ingredientes</label>
            <input
              type="text"
              className='input_form_newRecipe'
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setMostrarLista(true);
              }}
              placeholder="Buscar ingrediente..."
            />

            {mostrarLista && busqueda && (
              <div style={{ border: '1px solid #ccc', maxHeight: 100, overflowY: 'auto' }}>
                {ingredientesFiltrados.map((ing, i) => (
                  <div
                    key={i}
                    style={{ cursor: 'pointer', padding: '5px' }}
                    onClick={() => seleccionarIngrediente(ing)}
                  >
                    {ing.nombre} ({ing.unidad_medida}) - ${ing.costo}/unidad
                  </div>
                ))}
              </div>
            )}

            <div className='input_ingredient'>
              <input
                type="text"
                className='input_form_newRecipe'
                placeholder="Unidad de medida"
                value={nuevoIngrediente.unidad_medida}
                readOnly
              />
              <input
                type="number"
                className='input_form_newRecipe'
                placeholder="Cantidad"
                value={nuevoIngrediente.cantidad}
                onChange={(e) =>
                  setNuevoIngrediente({ ...nuevoIngrediente, cantidad: e.target.value })
                }
                step="0.01"
                min="0.01"
              />
              <input
                type="number"
                className='input_form_newRecipe'
                placeholder="Precio unitario"
                value={nuevoIngrediente.costo}
                readOnly
              />

              <div className='button_add_ingredient_wrapper'>
                <button className='btn_add_ingredient' type="button" onClick={agregarIngrediente}>
                  + Añadir
                </button>
              </div>
            </div>

            <ul>
              {receta.ingredientes.map((ing, index) => (
                <li key={index}>
                  {ing.cantidad} {ing.unidad_medida} de {ing.nombre} (
                  ${(parseFloat(ing.cantidad) * parseFloat(ing.costo)).toFixed(2)})
                </li>
              ))}
            </ul>
          </div>

          <div className='form_group'>
            <label>Precio estimado: ${receta.precio_estimado.toFixed(2)}</label>
          </div>

          <div className='form_group'>
            <label>Instrucciones:</label>
            <textarea
              value={receta.instrucciones}
              onChange={(e) => setReceta({ ...receta, instrucciones: e.target.value })}
              rows={5}
              maxLength={500}
              required
            />
          </div>

          <button className='btn_saveRecipe' type="submit">Guardar Receta</button>
        </form>
      </div>
    </>
  );
}

export default RegisterRecipe;

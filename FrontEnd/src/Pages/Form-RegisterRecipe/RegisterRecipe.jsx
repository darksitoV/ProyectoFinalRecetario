import './RegisterRecipe.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';

function RegisterRecipe() {
  const { user } = useAuth();

  const [receta, setReceta] = useState({
    nombre: '',
    tiempoPreparacion: 30,
    ingredientes: [],
    instrucciones: '',
    precioEstimado: 0
  });

  const [ingredientesDB, setIngredientesDB] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarLista, setMostrarLista] = useState(false);

  const [nuevoIngrediente, setNuevoIngrediente] = useState({
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
        setIngredientesDB(data);
      } catch (error) {
        console.error('Error al obtener ingredientes:', error);
      }
    };

    obtenerIngredientes();
  }, [user.id]);

  const ingredientesFiltrados = ingredientesDB.filter((ing) =>
    ing.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const seleccionarIngrediente = (ing) => {
    setNuevoIngrediente({
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
      precioEstimado: prev.precioEstimado + cantidad * costo
    }));

    setNuevoIngrediente({ nombre: '', unidad_medida: '', cantidad: '', costo: '' });
    setBusqueda('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Receta final:', receta);
    // Aquí podrías hacer un fetch POST al backend
  };

  return (
    <>
      <div className='container_new_recipe'>
        <h1 className='conteiner_title_newRecipe'>Nueva Receta</h1>
        <form className='conteiner_form_newRecipe' onSubmit={handleSubmit}>
          <div className='form_group'>
            <label>Nombre de la receta:</label>
            <input
              type="text"
              className='input_form_newRecipe'
              value={receta.nombre}
              onChange={(e) => setReceta({ ...receta, nombre: e.target.value })}
              required
            />
          </div>

          <div className='form_group'>
            <label>Tiempo de preparación (min):</label>
            <input
              type="number"
              className='input_form_newRecipe'
              value={receta.tiempoPreparacion}
              onChange={(e) => setReceta({ ...receta, tiempoPreparacion: e.target.value })}
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
            <label>Precio estimado: ${receta.precioEstimado.toFixed(2)}</label>
          </div>

          <div className='form_group'>
            <label>Instrucciones:</label>
            <textarea
              value={receta.instrucciones}
              onChange={(e) => setReceta({ ...receta, instrucciones: e.target.value })}
              rows={5}
              required
            />
          </div>

          <button type="submit">Guardar Receta</button>
        </form>
      </div>
    </>
  );
}

export default RegisterRecipe;

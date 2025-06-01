import './RegisterRecipe.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';


function RegisterRecipe() {
  const { user } = useAuth();
  const [receta, setReceta] = useState({
    nombre: '',
    tiempoPreparacion: 30,
    ingredientes: [],
    instrucciones: '',
    precioEstimado: 0.00
  });
  const [nuevoIngrediente, setNuevoIngrediente] = useState({
    nombre: '',
    unidad_medida: '',
    cantidad: '',
    costo: ''
  });
  const [ingredientesDB, setIngredientesDB] = useState([]);
  const [mostrarListaIngredientes, setMostrarListaIngredientes] = useState(false);
  const [busquedaIngrediente, setBusquedaIngrediente] = useState('');

  // Simulamos la carga de ingredientes desde la BD
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu API para obtener los ingredientes
    // Esto es un ejemplo con datos mock
    const fetchIngredientes = async () => {
      // Reemplaza esto con tu llamada real a la API
      const res = await fetch(`http://localhost:3000/${user.id}/ver_ingredientes`,{
            method: "GET",
            headers: { "Content-Type": "application/json" }
      });

        const mockIngredientes = await res.json();

      setIngredientesDB(mockIngredientes);
    };

    fetchIngredientes();
  }, [user.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceta({
      ...receta,
      [name]: value
    });
  };

  const handleIngredienteChange = (e) => {
    const { name, value } = e.target;
    setNuevoIngrediente({
      ...nuevoIngrediente,
      [name]: value
    });
  };

  const seleccionarIngrediente = (ingrediente) => {
    setNuevoIngrediente({
      ...nuevoIngrediente,
      nombre: ingrediente.nombre,
      unidad_medida: ingrediente.unidad_medida,
      costo: ingrediente.costo
    });
    setMostrarListaIngredientes(false);
    setBusquedaIngrediente('');
  };

  const agregarIngrediente = () => {
    if (nuevoIngrediente.nombre && nuevoIngrediente.cantidad && nuevoIngrediente.unidad_medida) {
      setReceta({
        ...receta,
        ingredientes: [...receta.ingredientes, nuevoIngrediente],
        precioEstimado: receta.precioEstimado + (parseFloat(nuevoIngrediente.costo) * parseFloat(nuevoIngrediente.cantidad))});
      setNuevoIngrediente({
        nombre: '',
        unidad_medida: '',
        cantidad: '',
        costo: ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para guardar la receta
    console.log('Receta guardada:', receta);
  };

  const ingredientesFiltrados = ingredientesDB.filter(ing =>
    ing.nombre.toLowerCase().includes(busquedaIngrediente.toLowerCase())
  );

  return (
    <div className="nueva-receta-container">
      <h1>Nueva Receta</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre de la Receta</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={receta.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Pastel de chocolate"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tiempoPreparacion">Tiempo de preparación (minutos)</label>
          <input
            type="number"
            id="tiempoPreparacion"
            name="tiempoPreparacion"
            value={receta.tiempoPreparacion}
            onChange={handleInputChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <h3>Ingredientes</h3>
          <div className="ingredientes-list">
            {receta.ingredientes.map((ing, index) => (
              <div key={index} className="ingrediente-item">
                <span>{ing.cantidad} {ing.unidad_medida} de {ing.nombre} (${(parseFloat(ing.costo) * parseFloat(ing.cantidad)).toFixed(2)})</span>
              </div>
            ))}
          </div>

          <div className="nuevo-ingrediente">
            <div className="ingrediente-autocomplete">
              <input
                type="text"
                name="nombre"
                value={nuevoIngrediente.nombre}
                onChange={(e) => {
                  setNuevoIngrediente({...nuevoIngrediente, nombre: e.target.value});
                  setBusquedaIngrediente(e.target.value);
                }}
                onFocus={() => setMostrarListaIngredientes(true)}
                placeholder="Buscar ingrediente..."
                required
              />
              {mostrarListaIngredientes && (
                <div className="lista-ingredientes">
                  {ingredientesFiltrados.map(ing => (
                    <div 
                      key={ing.id} 
                      className="ingrediente-option"
                      onClick={() => seleccionarIngrediente(ing)}
                    >
                      {ing.nombre} ({ing.unidad_medida}) - ${ing.consto}/unidad
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              name="unidad"
              value={nuevoIngrediente.unidad_medida}
              onChange={handleIngredienteChange}
              placeholder="Unidad"
              required
              disabled
            />

            <input
              type="number"
              name="cantidad"
              value={nuevoIngrediente.cantidad}
              onChange={handleIngredienteChange}
              placeholder="Cantidad"
              required
              step="0.01"
              min="0.01"
            />

            <input
              type="number"
              name="precio"
              value={nuevoIngrediente.costo}
              onChange={handleIngredienteChange}
              placeholder="Precio unitario"
              step="0.01"
              min="0"
              disabled
            />

            <button type="button" onClick={agregarIngrediente}>
              + Añadir ingrediente
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Precio Estimado</label>
          <span>${receta.precioEstimado.toFixed(2)}</span>
        </div>

        <div className="form-group">
          <label htmlFor="instrucciones">Instrucciones</label>
          <textarea
            id="instrucciones"
            name="instrucciones"
            value={receta.instrucciones}
            onChange={handleInputChange}
            rows="6"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Guardar Receta</button>
          <button type="button" className="secondary">
            Añadir imagen de la receta
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterRecipe;
import React from 'react';
import './MyRecipes.css';
import BackButton from '../../Components/Back-Button/Back-Button';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import loadingComponent from '../../Components/Loading/Loader';

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`https://proyectofinalrecetario.onrender.com/${user.id}/recetas`);
        
        if (!response.ok) {
          throw new Error('No se pudo obtener las recetas');
        }
        
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          throw new Error('Formato de datos incorrecto');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user.id]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  if (loading) {
    return <div>{loadingComponent()}</div>;
  }

  if (error) {
    return <div className="my_recipes_container">Error: {error}</div>;
  }

  return (
    <div className="my_recipes_container">
      <div className="my_recipes_header">
        <h2 className='title_myRecipes'>Mis Recetas</h2>
        <BackButton/>
      </div>
      
      <div className="recipe-grid">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div 
              key={recipe.id_receta} 
              className="recipe-card" 
              onClick={() => handleRecipeClick(recipe)}
            >
              <div className="recipe-info">
                <h3>{recipe.nombre_receta || 'Nombre no disponible'}</h3>
                <p>Tiempo: {recipe.tiempo_realizacion} min</p>
                <p>${parseFloat(recipe.precio_estimado || 0).toFixed(2)}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes recetas guardadas</p>
        )}
      </div>

      {/* Modal para mostrar detalles de la receta */}
      {showModal && selectedRecipe && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            
            <h2>{selectedRecipe.nombre_receta}</h2>
            
            <div className="recipe-details">
              <div className="detail-row">
                <span>Tiempo de realización:</span>
                <span>{selectedRecipe.tiempo_realizacion} minutos</span>
              </div>
              
              <div className="detail-row">
                <span>Precio estimado:</span>
                <span>${parseFloat(selectedRecipe.precio_estimado || 0).toFixed(2)}</span>
              </div>
              
              {selectedRecipe.instrucciones && (
                <div className="detail-section">
                  <h3>Instrucciones:</h3>
                  <p>{selectedRecipe.instrucciones}</p>
                </div>
              )}
              
              <div className="detail-section">
                <h3>Ingredientes:</h3>
                {selectedRecipe.ingredientes && selectedRecipe.ingredientes.length > 0 ? (
                  <ul className="ingredients-list">
                    {selectedRecipe.ingredientes.map((ingrediente) => (
                      <li key={ingrediente.id_ingrediente}>
                        <span className="ingredient-name">{ingrediente.nombre}</span>
                        <span className="ingredient-quantity">
                          {ingrediente.cantidad} {ingrediente.unidad_medida}
                        </span>
                        <span className="ingredient-cost">(${ingrediente.costo})</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No se especificaron ingredientes</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
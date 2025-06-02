import React from 'react';
import './MyRecipes.css'; // Puedes poner el CSS aquí o usar Tailwind si prefieres

const recipes = [
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 },
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 },
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 },
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 },
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 },
  { name: 'Pastel de chocolate', time: '40 min', price: 120.59 }
];

const MyRecipes = () => {
  return (
    <div className="my-recipes-container">
      <div className="my-recipes-header">
        <h2>Mis Recetas</h2>
        <button onClick={() => window.history.back()} className="back-button">Volver</button>
      </div>
      
      <div className="recipe-grid">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <div className="recipe-info">
              <h3>{recipe.name}</h3>
              <p>Tiempo de elaboración: {recipe.time}</p>
              <p>${recipe.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
import { useNavigate } from 'react-router-dom';
import './RegisterIngredients.css';

function RegisterIngredients() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar el ingrediente
        console.log('Ingrediente guardado');
    };

    const handleBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <>
            <header className="title-container">
                <h1 className="page-title">Gestión de Ingredientes</h1>
                <nav className="user-navigation">
                    <div className="nav-container">
                        <button 
                            className="back-button"
                            onClick={handleBack}
                        >
                            Volver
                        </button>
                    </div>
                </nav>
            </header>

            <main className="content-IngredientForm">
                <form className="ingredient-form" onSubmit={handleSubmit}>
                    <h2 className="form-title">Agregar nuevo ingrediente</h2>

                    <div className="RegisterIngredient-form-group">
                        <div className="registration-form-group">
                            <label className="RegisterIngredient-form-label">Nombre del ingrediente</label>
                            <div className="RegistrationIngredient-input-wrapper">
                            <input 
                                type="text" 
                                id="ingredient-name" 
                                className="RegisterIngredient-form-input" 
                                placeholder="Ej: Harina de trigo"
                                required
                            />
                            </div>
                        </div>
                    </div>

                    <div className="RegisterIngredient-form-group">
                        <div className="registration-form-group">
                            <label className="RegisterIngredient-form-label">Cantidad</label>
                            <div className="RegistrationIngredient-input-wrapper">
                            <input 
                                type="number" 
                                id="quantity" 
                                className="RegisterIngredient-form-input" 
                                defaultValue="0"
                                min="0"
                                step="0.01"
                                required
                            />
                            </div>
                        </div>
                    </div>

                    <div className="RegisterIngredient-form-group ">
                    <label className="RegisterIngredient-form-label">Unidad</label>
                    <div className="registration-input-wrapper">
                        <select
                        className="RegisterIngredient-form-input"
                        required
                        >
                        <option value="" disabled></option>
                        <option value="ama_de_casa">Kg</option>
                        <option value="chef">Pz</option>
                        </select>
                    </div>
                    </div>

                    <div className="RegisterIngredient-form-group">
                        <div className="registration-form-group">
                            <label className="RegisterIngredient-form-label">Precio por Unidad</label>
                            <div className="RegistrationIngredient-input-wrapper">
                        <input 
                            type="number" 
                            id="price" 
                            className="RegisterIngredient-form-input" 
                            defaultValue="0.00" 
                            step="0.01"
                            min="0"
                            required
                        />
                            </div>
                        </div>
                    </div>

                    <div className="RegisterIngredient-form-actions">
                        <button type="submit" className="RegisterIngredient-button">
                            Guardar Ingrediente
                        </button>
                    </div>
                </form>
                <aside className="secondary-content"></aside>
            </main>
        </>
    );
}

export default RegisterIngredients;
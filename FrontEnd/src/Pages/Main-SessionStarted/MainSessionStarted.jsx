import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import './MainSessionStarted.css';


function MainSessionStarted() {

    const { user } = useAuth();

    return (
        <>
            <main class="conteiner_main">
            <div class="dashboard-inner">
                <header>
                <h1 class="welcome-message">¡Hola, {user.username}! ¿Qué cocinaremos hoy?</h1>
                </header>
                <section class="content-section">
                    <nav className="action-grid">
                    <div className="action-card">
                        <Link to="register_ingredients" className="card-link">
                        <div className="bg">
                            <div className="card-content">
                            <div className="card-icon">
                                <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003"
                                alt="Añadir ingredientes"
                                className="icon"
                                />
                            </div>
                            <span className="card-title">Añadir ingredientes</span>
                            </div>
                        </div>
                        <div className="blob"></div>
                        </Link>
                    </div>

                    <div className="action-card">
                        <Link to="register_recipe" className="card-link">
                        <div className="bg">
                            <div className="card-content">
                            <div className="card-icon">
                                <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003"
                                alt="Crear receta"
                                className="icon"
                                />
                            </div>
                            <span className="card-title">Crear Receta</span>
                            </div>
                        </div>
                        <div className="blob"></div>
                        </Link>
                    </div>

                    <div className="action-card">
                        <Link to="check_my_recipes" className="card-link">
                        <div className="bg">
                            <div className="card-content">
                            <div className="card-icon">
                                <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003"
                                alt="Consultar recetas"
                                className="icon"
                                />
                            </div>
                            <span className="card-title">Consultar mis Recetas</span>
                            </div>
                        </div>
                        <div className="blob"></div>
                        </Link>
                    </div>

                    <div className="action-card">
                        <Link to="update_ingredients" className="card-link">
                        <div className="bg">
                            <div className="card-content">
                            <div className="card-icon">
                                <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003"
                                alt="Presupuesto"
                                className="icon"
                                />
                            </div>
                            <span className="card-title">Consultar Ingredientes</span>
                            </div>
                        </div>
                        <div className="blob"></div>
                        </Link>
                    </div>
                    </nav>
                </section>
            </div>
            </main>
        </>
    )
}


export default MainSessionStarted;
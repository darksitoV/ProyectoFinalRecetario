import { useLocation, Link } from 'react-router-dom';
import './MainSessionStarted.css';


function MainSessionStarted() {

    const location = useLocation();
    const userName = location.state?.userName || 'usuario';

    return (
        <>
            <main class="dashboard-container">
            <div class="dashboard-inner">
                <header>
                <h1 class="welcome-message">¡Hola, {userName}! ¿Qué cocinaremos hoy?</h1>
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
                        <Link to="/crear-receta" className="card-link">
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
                        <Link to="/consultar-recetas" className="card-link">
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
                        <Link to="/presupuesto" className="card-link">
                        <div className="bg">
                            <div className="card-content">
                            <div className="card-icon">
                                <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003"
                                alt="Presupuesto"
                                className="icon"
                                />
                            </div>
                            <span className="card-title">Presupuesto</span>
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
import { useLocation } from 'react-router-dom';
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
                <nav class="action-grid">
                    <div className='action-card'>
                        <div className='bg'>
                            <div class="card-content">
                                <div class="card-icon">
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Crear Receta icon" class="icon"/>
                                </div>
                                <span class="card-title">Añadir ingredientes</span>
                            </div>
                        </div>
                        <div className='blob'></div>
                    </div>

                    <div className='action-card'>
                        <div className='bg'>
                            <div class="card-content">
                                <div class="card-icon">
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Crear Receta icon" class="icon"/>
                                </div>
                                <span class="card-title">Crear Receta</span>
                            </div>
                        </div>
                        <div className='blob'></div>
                    </div>

                    <div className='action-card'>
                        <div className='bg'>
                            <div class="card-content">
                                <div class="card-icon">
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Crear Receta icon" class="icon"/>
                                </div>
                                <span class="card-title">Consular mis Recetas</span>
                            </div>
                        </div>
                        <div className='blob'></div>
                    </div>

                    <div className='action-card'>
                        <div className='bg'>
                            <div class="card-content">
                                <div class="card-icon">
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Crear Receta icon" class="icon"/>
                                </div>
                                <span class="card-title">Presupuesto</span>
                            </div>
                        </div>
                        <div className='blob'></div>
                    </div>
                </nav>
                </section>
            </div>
            </main>
        </>
    )
}


export default MainSessionStarted;
import './MainSessionStarted.css';


function MainSessionStarted() {
    return (
        <>
            <main class="dashboard-container">
            <div class="dashboard-inner">
                <header>
                <h1 class="welcome-message">¡Hola, Usuario! ¿Qué cocinaremos hoy?</h1>
                </header>
                <section class="content-section">
                <nav class="action-grid">
                    <button class="action-card">
                    <div class="card-content">
                        <div class="card-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8efe2233181f45b8fc29d3910fe8572ee2cb1777" alt="Añadir ingredientes icon" class="icon"/>
                        </div>
                        <span class="card-title">Añadir ingredientes</span>
                    </div>
                    </button>

                    <button class="action-card">
                    <div class="card-content">
                        <div class="card-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Crear Receta icon" class="icon"/>
                        </div>
                        <span class="card-title">Crear Receta</span>
                    </div>
                    </button>

                    <button class="action-card">
                    <div class="card-content">
                        <div class="card-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8efe2233181f45b8fc29d3910fe8572ee2cb1777" alt="Consultar mis Recetas icon" class="icon"/>
                        </div>
                        <span class="card-title">Consular mis Recetas</span>
                    </div>
                    </button>

                    <button class="action-card">
                    <div class="card-content">
                        <div class="card-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3436a6624221d3550c32661a0e7aad1ffc880003" alt="Presupuesto icon" class="icon"/>
                        </div>
                        <span class="card-title">Presupuesto</span>
                    </div>
                    </button>
                </nav>
                </section>
            </div>
            </main>
        </>
    )
}


export default MainSessionStarted;
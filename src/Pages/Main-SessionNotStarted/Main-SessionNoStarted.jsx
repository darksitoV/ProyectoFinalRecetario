import './Main-SessionNoStarted.css'

function MainSessionNotStarted() {
  return (
    <>
    <main class="welcome-container">
    <header class="welcome-content">
        <h1 class="welcome-title">Bienvenido a Mi Recetario.com</h1>
        <p class="welcome-subtitle">Accede a todas las funciones iniciando sesión</p>
        <nav class="button-group">
        <button class="action-button">Iniciar Sesion</button>
        <button class="action-button">Registrarse</button>
        </nav>
    </header>
    </main>
    </>
  );
}

export default MainSessionNotStarted;
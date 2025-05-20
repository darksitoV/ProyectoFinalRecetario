import './HomeSession.css'

function HomeSession() {
    return (
    <>
    <main class="page-container">
    <section class="content-wrapper">
        <div class="login-card">
        <h1 class="login-title">Iniciar Sesión</h1>

        <form class="login-form">
            <div class="form-group">
            <label for="username" class="input-label">Usuario
                <div class="input-wrapper">
                <input type="text" id="username" placeholder="Ingresa tu usuario" className="form-input"/>
                </div>
            </label>
            </div>

            <div class="form-group">
            <label for="password" class="input-label">Contraseña
                <div class="input-wrapper">
                <input type="password" id="password" placeholder="Ingresa tu contraseña" className="form-input"/>
            </div>
            </label>
            </div>

            <div class="button-wrapper">
            <button type="submit" class="submit-button">Ingresar</button>
            </div>

            <a href="#" class="register-link">¿No tienes cuenta? Regístrate aquí</a>
        </form>
        </div>
    </section>
    </main>
    </>
    );
}

export default HomeSession;
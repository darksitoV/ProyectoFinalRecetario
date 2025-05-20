import './FormStarSession.css'

function FormStartSession() {
    return (
    <>
    <main class="page-container">
    <section class="content-wrapper">
        <div class="login-card">
        <h1 class="login-title">Iniciar Sesión</h1>

        <form class="login-form">
            <div class="form-group">
            <label for="username" class="input-label">Usuario</label>
            <div class="input-wrapper">
                <input
                type="text"
                id="username"
                placeholder="Ingresa tu usuario"
                class="form-input"
                />
            </div>
            </div>

            <div class="form-group">
            <label for="password" class="input-label">Contraseña</label>
            <div class="input-wrapper">
                <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                class="form-input"
                />
            </div>
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

export default FormStartSession;
import { useNavigate } from 'react-router-dom';
import './HomeSession.css';

function HomeSession() {
    const navigate = useNavigate();
    const handleRegistrationClick = () => {
        navigate('/registration');
    }
    return (
    <>
    <main className="Home-page-container">
    <section className="Home-content-wrapper">
        <div className="Home-login-card">
        <h1 className="Home-login-title">Iniciar Sesión</h1>

        <form className="Home-login-form">
            <div className="Home-form-group">
            <label for="username" class="Home-input-label">Usuario
                <div className="Home-input-wrapper">
                <input type="text" id="username" placeholder="Ingresa tu usuario" className="Home-form-input"/>
                </div>
            </label>
            </div>

            <div class="Home-form-group">
            <label for="password" className="Home-input-label">Contraseña
                <div className="Home-input-wrapper">
                <input type="password" id="password" placeholder="Ingresa tu contraseña" className="Home-form-input"/>
            </div>
            </label>
            </div>

            <div className="Home-button-wrapper">
            <button type="submit" className="Home-submit-button">Ingresar</button>
            </div>

            <a href="#" className="Home-register-link" onClick={handleRegistrationClick}>¿No tienes cuenta? Regístrate aquí</a>
        </form>
        </div>
    </section>
    </main>
    </>
    );
}

export default HomeSession;
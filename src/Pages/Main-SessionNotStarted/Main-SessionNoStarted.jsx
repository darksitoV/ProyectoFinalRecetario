import './Main-SessionNoStarted.css'
import { useNavigate } from 'react-router-dom';

function MainSessionNotStarted() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };
    const handleRegistrationClick = () => {
      navigate('/registration')
    };
  return (
    <>
    <main className="welcome-container">
    <header className="welcome-content">
        <h1 className="welcome-title">Bienvenido a Mi Recetario.com</h1>
        <p className="welcome-subtitle">Accede a todas las funciones iniciando sesión</p>
        <nav className="button-group">
        <button className="action-button" onClick={handleLoginClick}>Iniciar Sesion</button>
        <button className="action-button" onClick={handleRegistrationClick}>Registrarse</button>
        </nav>
    </header>
    </main>
    </>
  );
}

export default MainSessionNotStarted;
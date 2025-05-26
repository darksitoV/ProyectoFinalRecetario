import { useNavigate } from 'react-router-dom';
import './HomeSession.css';
import { useState } from 'react';

function HomeSession() {
    // Estado para manejar el nombre de usuario y la contraseña
    const [username, setUsername] = useState("");
    const [showUsernameError, setShowUsernameError] = useState(false);
    
    // Estado para manejar la contraseña
    const [password, setPassword] = useState("");
    const [showPasswordError, setShowPasswordError] = useState(false);


    // Estado para manejar errores del servidor y mensajes de éxito
    const [serverError, setServerError] = useState("");
    const [serverUsernameError, setServerUsernameError] = useState("");
    const [serverPasswordError, setServerPasswordError] = useState("");

    // Validación del nombre de usuario
    const validateUsername = () => {
        if (username.trim() === "") {
            setShowUsernameError(true);
        } else {
            setShowUsernameError(false);
        }
    }

    // Validación de la contraseña
    const validatePassword = () => {
        if (password.trim() === "") {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false);
        }
    };

    // Estado para la navegacion
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateUsername();
        validatePassword();
        
        setShowPasswordError("");
        setShowUsernameError("");

        const isValidUsername = validateUsername();
        const isValidPassword = validatePassword();

        if (!isValidUsername || !isValidPassword) {
            setServerError("Por favor, completa todos los campos requeridos.");
            return;
        }

        const userData = {
            username: username,
            password: password
        };

        const response = fetch('http://localhost:3000/registration', { method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = response.json();
        if (data.status === 200) {
            // Redirigir a la página de inicio
            navigate('/home');
        } else if (data.status === 400) {
            setServerError("Usuario o contraseña incorrectos.");
        } else if (data.status === 500) {
            setServerError("Error del servidor. Por favor, inténtalo más tarde.");
        }
    }

    // Rutas para la navegación
    const handleRegistrationClick = () => {
        navigate('/registration');
    }

    return (
    <>
    <main className="Home-page-container">
    <section className="Home-content-wrapper">
        <div className="Home-login-card">
        <h1 className="Home-login-title">Iniciar Sesión</h1>

        {serverError && <p className="Home-error-message">{serverError}</p>}

        <form className="Home-login-form" onSubmit={handleSubmit}>
            <div className="Home-form-group">
            <label for="username" class="Home-input-label">Usuario
                <div className="Home-input-wrapper">
                <input type="text" value={username} onChange={(e) => {setUsername(e.target.value); setServerUsernameError("")}} 
                placeholder="Ingresa tu usuario" className="Home-form-input"/>
                {
                    showUsernameError && (<p className="Home-error-message">Usuario requerido</p>)
                }
                </div>
            </label>
            </div>

            <div class="Home-form-group">
            <label for="password" className="Home-input-label">Contraseña
                <div className="Home-input-wrapper">
                <input type="password" id="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                 placeholder="Ingresa tu contraseña" className="Home-form-input"/>
                 {
                    showPasswordError && (<p className="Home-error-message">Contraseña requerida</p>)
                 }
            </div>
            </label>
            </div>

            <div className="Home-button-wrapper">
            <button type="submit" className="Home-submit-button" onClick={handleSubmit}>Ingresar</button>
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
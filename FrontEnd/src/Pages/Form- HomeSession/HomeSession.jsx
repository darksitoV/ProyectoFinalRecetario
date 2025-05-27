import { useNavigate } from 'react-router-dom';
import './HomeSession.css';
import { useState } from 'react';

function HomeSession() {
    const [username, setUsername] = useState("");
    const [showUsernameError, setShowUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    // Validación del nombre de usuario
    const validateUsername = () => {
        const isValid = username.trim() !== "";
        setShowUsernameError(!isValid);
        return isValid;
    }

    // Validación de la contraseña
    const validatePassword = () => {
        const isValid = password.trim() !== "";
        setShowPasswordError(!isValid);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const isValidUsername = validateUsername();
        const isValidPassword = validatePassword();

        if (!isValidUsername || !isValidPassword) {
            setServerError("Por favor, completa todos los campos requeridos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST', // Cambiado a POST para login
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usuario: username,
                    contraseña: password
                })
            });

            const data = await response.json(); // Falta el await aquí

            if (response.ok) {
                // Redirigir a la página de bienvenida con el nombre de usuario
                navigate('/home', { 
                    state: { 
                        userName: data.name || username // Usar data.name si existe, sino el username
                    } 
                });
            } else {
                setServerError(data.message || "Usuario o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error:", error);
            setServerError("Error al conectar con el servidor");
        }
    }

    const handleRegistrationClick = (e) => {
        e.preventDefault();
        navigate('/registration');
    }

    return (
        <main className="Home-page-container">
            <section className="Home-content-wrapper">
                <div className="Home-login-card">
                    <h1 className="Home-login-title">Iniciar Sesión</h1>

                    {serverError && <p className="Home-error-message">{serverError}</p>}

                    <form className="Home-login-form" onSubmit={handleSubmit}>
                        <div className="Home-form-group">
                            <label htmlFor="username" className="Home-input-label">Usuario
                                <div className="Home-input-wrapper">
                                    <input 
                                        type="text" 
                                        id="username"
                                        value={username} 
                                        onChange={(e) => {
                                            setUsername(e.target.value); 
                                            setServerError("");
                                        }} 
                                        placeholder="Ingresa tu usuario" 
                                        className="Home-form-input"
                                    />
                                    {showUsernameError && <p className="Home-error-message">Usuario requerido</p>}
                                </div>
                            </label>
                        </div>

                        <div className="Home-form-group">
                            <label htmlFor="password" className="Home-input-label">Contraseña
                                <div className="Home-input-wrapper">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setServerError("");
                                        }}
                                        placeholder="Ingresa tu contraseña" 
                                        className="Home-form-input"
                                    />
                                    {showPasswordError && <p className="Home-error-message">Contraseña requerida</p>}
                                </div>
                            </label>
                        </div>

                        <div className="Home-button-wrapper">
                            <button type="submit" className="Home-submit-button">Ingresar</button>
                        </div>

                        <a href="/registration" className="Home-register-link" onClick={handleRegistrationClick}>
                            ¿No tienes cuenta? Regístrate aquí
                        </a>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default HomeSession;
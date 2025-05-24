import './Form-Registration.css'
import { useState } from 'react';
import AlertModal from '../../Components/Modal/Modal.jsx';

function Form_Registration() {
    // Estado para mostrar el modal
    const [openModal, setOpenModal] = useState(false);


    // Estado para el nombre y los apellidos
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [errorName, setErrorName] = useState({ first_name: "", last_name: "" });

    const handleNameSubmit = () => {
        const newErrors = { first_name: "", last_name: "" };

        if (first_name.trim() === "") {
        newErrors.first_name = "Porfavor ingresa tu nombre.";
        }
        if (last_name.trim() === "") {
        newErrors.last_name = "Porfavor ingresa tus apellidos.";
        }

        setErrorName(newErrors);
        return newErrors.first_name === "" && newErrors.last_name === "";
    };

    // Estado para la ocupación
     const [occupation, setOccupation] = useState(""); // Guardar la ocupacion seleccionada

     // Estado para guardar la fecha de nacimiento
    const [birth_date, setBirthDate] = useState(""); // Guardar la fecha de nacimiento seleccionada
    const getMaxBirthDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    };

    const maxDate = getMaxBirthDate();
    const minDate = "1910-01-01";

    // Estado para guardar el nombre de usuario
    const [username, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    // Validar username
    const handleUsernameSubmit = () => {
        if (username.trim() === "") {
        setUserNameError("El nombre de usuario no puede estar vacío");
        return false;
        }
        setUserNameError("");
        return true;
    };

    // Estado para la contraseña y el error de validación
    const [password, setPassword] = useState("");
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswordMismatchError, setShowPasswordMismatchError] = useState(false);

    const handlePasswordSubmit = () => {
        
        // Validar longitud de la contraseña
        if (password.length < 8) {
            setShowPasswordError(true);
            setShowPasswordMismatchError(false);
            return false; // Detener la ejecución si no es válida
        } else {
            setShowPasswordError(false);
        }
        
        // Validar coincidencia de contraseñas (solo si la primera tiene longitud válida)
        if (password !== confirmPassword) {
            setShowPasswordMismatchError(true);
            return false; // Detener la ejecución si no coinciden
        } else {
            setShowPasswordMismatchError(false);
        }

        return true; // Si ambas validaciones son exitosas
    };
    
    // Estado para el correo electrónico y el error de validación
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) {
        setEmailError("El correo electrónico es requerido");
        return false;
    } else if (!emailRegex.test(input)) {
        setEmailError("Ingresa un correo electrónico válido");
        return false;
    } else {
        setEmailError("");
        return true;
    }
    };
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true); // Muestra el modal al enviar el formulario
    setServerError(""); // Reinicia el mensaje de error
    setSuccessMessage(""); // Reinicia el mensaje de éxito

    // Validaciones síncronas
    const isNameValid = handleNameSubmit();
    const isUsernameValid = handleUsernameSubmit();
    const isPasswordValid = handlePasswordSubmit();
    const isEmailValid = validateEmail(email); // Asegúrate de que sea síncrona

    if (!isNameValid || !isUsernameValid || !isPasswordValid || !isEmailValid) {
        setServerError("Por favor, completa todos los campos correctamente.");
        return; // Detiene el envío si hay errores
    }

    // Datos para enviar al servidor
    const userData = {
        first_name,
        last_name,
        birth_date,
        username,
        occupation,
        password,
        email,
    };

    try {
        const response = await fetch("http://localhost:3000/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            setSuccessMessage("¡Registro exitoso! Redirigiendo...");
        } else {
            setServerError(data.error || "Error en el servidor. Intenta nuevamente.");
        }
    } catch (err) {
        setServerError("Error de conexión. Verifica tu red.");
        console.error("Error al enviar datos:", err);
    }
};

    return (
        <>
        <main className="registration-container">
        <div className="registration-wrapper">
            <form className="registration-form" onSubmit={handleSubmit}>
            <h1 className="registration-form-title">Crear Cuenta</h1>

            <div className="registration-form-group">
                <label className="registration-form-label">Nombre</label>
                <div className="registration-input-wrapper">
                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                    className="registration-form-input"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </div>
                {errorName.first_name && <p className="registration-error-message">{errorName.first_name}</p>}
            </div>

            <div className="registration-form-group">
                <label className="registration-form-label">Apellidos</label>
                <div className="registration-input-wrapper">
                <input
                    type="text"
                    placeholder="ingresa tus apellidos"
                    className="registration-form-input"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
                </div>
                {errorName.last_name && <p className="registration-error-message">{errorName.last_name}</p>}
            </div>

            <div className="registration-form-group">
                <label className="registration-form-label">Fecha de Nacimiento</label>
                <div className="registration-input-wrapper">
                    <input
                    type="date"
                    value={birth_date}
                    onChange={(e) => setBirthDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                    className="registration-form-input"
                    />
                </div>
            </div>

            <div className="registration-form-group">
            <label className="registration-form-label">Ocupación</label>
            <div className="registration-input-wrapper">
                <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="registration-form-input"
                required
                >
                <option value="" disabled>Selecciona tu ocupación</option>
                <option value="ama_de_casa">Ama de casa</option>
                <option value="chef">Chef</option>
                </select>
            </div>
            </div>


            <div className="registration-form-group">
            <label className="registration-form-label">Usuario</label>
            <div className="registration-input-wrapper">
                <input
                type="text"
                maxLength={20}
                placeholder="Crea tu nombre de usuario (max 20 caracteres)"
                value={username}
                onChange={(e) => {
                    //Eliminar espacios en blanco
                    const valueNoSpaces = e.target.value.replace(/\s/g, "");
                    setUserName(valueNoSpaces);
                }}
                className="registration-form-input"
                />
            </div>
            {userNameError && <p className="registration-error-message">{userNameError}</p>}
            </div>


            <div className="registration-form-group">
            <label className="registration-form-label">Correo Electrónico</label>
            <div className="registration-input-wrapper">
                <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email)}
                placeholder="Ingresa tu correo electrónico"
                className={`registration-form-input ${emailError ? "input-error" : ""}`}
                />
            </div>
            {emailError && <p className="registration-error-message">{emailError}</p>}
            </div>

            <div className="registration-form-group">
                <label className="registration-form-label">Contraseña</label>
                <div className="registration-input-wrapper">
                <input type="password" placeholder="Crea una contraseña segura(min 8 caracteres)"
                minLength={8} maxLength={30} 
                className="registration-form-input" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {showPasswordError && (
                    <p className="registration-error-message">La contraseña debe tener al menos 8 caracteres</p>
                )}
            </div>

            <div className="registration-form-group">
                <label className="registration-form-label">Confirmar contraseña</label>
                <div className="registration-input-wrapper">
                <input type="password" placeholder="Confirma tu contraseña"
                minLength={8} maxLength={30} 
                className="registration-form-input" value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                {showPasswordError && (
                    <p className="registration-error-message">La contraseña debe tener al menos 8 caracteres</p>
                )}
                {showPasswordMismatchError && password !== confirmPassword && (
                    <p className="registration-error-message">Las contraseñas no coinciden</p>
                )}
            </div>

            <div className="registration-button-wrapper">
            <button 
            type="submit" 
            className="registration-submit-button"
            >
            Registrarme
            </button>

            <AlertModal
            open={openModal}
            onClose={() => setOpenModal(false)}  // Corregido aquí
            message={serverError || successMessage}
            isError={!!serverError}
            />
            </div>

            </form>

        </div>
        </main>
        </>
    )
}

export default Form_Registration;
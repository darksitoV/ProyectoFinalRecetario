import './Form-Registration.css'
import React from 'react';
import { useState } from 'react';

function Form_Registration() {
    // Estado para el nombre y los apellidos
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorName, setErrorName] = useState({ firstName: "", lastName: "" });

    const handleNameSubmit = () => {
        const newErrors = { firstName: "", lastName: "" };

        if (firstName.trim() === "") {
        newErrors.firstName = "Porfavor ingresa tu nombre.";
        }
        if (lastName.trim() === "") {
        newErrors.lastName = "Porfavor ingresa tus apellidos.";
        }

        setErrorName(newErrors);
        return newErrors.firstName === "" && newErrors.lastName === "";
    };

    // Estado para la ocupación
     const [occupation, setOccupation] = useState(""); // Guardar la ocupacion seleccionada

     // Estado para guardar la fecha de nacimiento
    const [birthDate, setBirthDate] = useState(""); // Guardar la fecha de nacimiento seleccionada
    const getMaxBirthDate = () => {
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
    };

    const maxDate = getMaxBirthDate();
    const minDate = "1910-01-01";

    // Estado para guardar el nombre de usuario
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");

    // Validar username
    const handleUsernameSubmit = () => {
        if (userName.trim() === "") {
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
    if (!input) {
        setEmailError("El correo electrónico es requerido");
        } else if (!emailRegex.test(input)) {
        setEmailError("Ingresa un correo electrónico válido");
        } else {
        setEmailError("");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const namValid = handleNameSubmit();
        const validateUserName = handleUsernameSubmit();
        const passwordValid = handlePasswordSubmit();

        if(namValid && passwordValid && validateUserName) {
            console.log("Formulario enviado");
        } else {
            console.log("Formulario no válido");
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
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                </div>
                {errorName.firstName && <p className="registration-error-message">{errorName.firstName}</p>}
            </div>

            <div className="registration-form-group">
                <label className="registration-form-label">Apellidos</label>
                <div className="registration-input-wrapper">
                <input
                    type="text"
                    placeholder="ingresa tus apellidos"
                    className="registration-form-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                </div>
                {errorName.lastName && <p className="registration-error-message">{errorName.lastName}</p>}
            </div>

            <div class="registration-form-group">
                <label class="registration-form-label">Fecha de Nacimiento</label>
                <div class="registration-input-wrapper">
                    <input
                    type="date"
                    value={birthDate}
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
                <option value="ama-de-casa">Ama de casa</option>
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
                value={userName}
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

            <div class="registration-form-group">
                <label className="registration-form-label">Contraseña</label>
                <div className="registration-input-wrapper">
                <input type="password" placeholder="Crea una contraseña segura(min 8 caracteres)"
                minLength={8} maxLength={30} 
                class="registration-form-input" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {showPasswordError && (
                    <p className="registration-error-message">La contraseña debe tener al menos 8 caracteres</p>
                )}
            </div>

            <div class="registration-form-group">
                <label className="registration-form-label">Confirmar contraseña</label>
                <div className="registration-input-wrapper">
                <input type="password" placeholder="Confirma tu contraseña"
                minLength={8} maxLength={30} 
                class="registration-form-input" value={confirmPassword} 
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
                <button type="submit"  className="registration-submit-button">Registrarme</button>
            </div>
            </form>
        </div>
        </main>
        </>
    )
}

export default Form_Registration;
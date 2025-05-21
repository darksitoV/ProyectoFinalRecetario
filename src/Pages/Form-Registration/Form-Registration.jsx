import './Form-Registration.css'
import React from 'react';
import { useState } from 'react';

function Form_Registration() {

    // Estado para la ocupación
     const [occupation, setOccupation] = useState(""); // Guardar la ocupacion seleccionada

     // Estado para guardar la fecha de nacimiento
        const [birthDate, setBirthDate] = useState(""); // Guardar la fecha de nacimiento seleccionada

    // Estado para la contraseña y el error de validación
    const [password, setPassword] = React.useState("");
    const [showPasswordError, setShowPasswordError] = React.useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar la contraseña cuando se envía el formulario
        if (password.length < 8) {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false);
        }
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
    }


    return (
        <>
        <main className="registration-container">
        <div className="registration-wrapper">
            <form className="registration-form" onSubmit={handleSubmit}>
            <h1 className="registration-form-title">Crear Cuenta</h1>

            <div class="registration-form-group">
                <label class="registration-form-label">Nombre</label>
                <div class="registration-input-wrapper">
                <input type="text" placeholder="Ingresa tu  Nombre" className="registration-form-input" />
                </div>
            </div>

            <div class="registration-form-group">
                <label class="registration-form-label">Apellidos</label>
                <div class="registration-input-wrapper">
                <input type="text" placeholder="Ingresa tus Apellidos" className="registration-form-input" />
                </div>
            </div>

            <div class="registration-form-group">
                <label class="registration-form-label">Fecha de Nacimiento</label>
                <div class="registration-input-wrapper">
                <input type="date" placeholder="DD/MM/AAAA" 
                value={birthDate} onChange={(e) => setBirthDate(e.target.value)} 
                className="registration-form-input" />
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

            <div class="registration-form-group">
                <label class="registration-form-label">Usuario</label>
                <div class="registration-input-wrapper">
                <input type="text" placeholder="Crea tu nombre de usuario" className="registration-form-input" />
                </div>
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
            {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div class="registration-form-group">
                <label className="registration-form-label">Contraseña</label>
                <div className="registration-input-wrapper">
                <input type="password" placeholder="Crea una contraseña segura" class="registration-form-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {showPasswordError && (
                    <p className="registration-error-message">La contraseña debe tener al menos 8 caracteres</p>
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
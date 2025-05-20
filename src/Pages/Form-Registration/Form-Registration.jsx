import './Form-Registration.css'
import React from 'react';

function Form_Registration() {
    const [password, setPassword] = React.useState("");
    const [showPasswordError, setShowPasswordError] = React.useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar la contraseña cuando se envía el formulario
        if (password.length < 8) {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false);
            // Aquí puedes continuar con el envío del formulario
            console.log("Formulario enviado");
        }
    };

    return (
        <>
        <main className="registration-container">
        <div className="registration-wrapper">
            <form className="registration-form" onSubmit={handleSubmit}>
            <h1 className="form-title">Crear Cuenta</h1>

            <div class="form-group">
                <label class="form-label">Nombre</label>
                <div class="input-wrapper">
                <input type="text" placeholder="Ingresa tu  Nombre" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Apellidos</label>
                <div class="input-wrapper">
                <input type="text" placeholder="Ingresa tus Apellidos" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Fecha de Nacimiento</label>
                <div class="input-wrapper">
                <input type="date" placeholder="DD/MM/AAAA" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Ocupacion</label>
                <div class="input-wrapper">
                <input type="text" placeholder="Ingresa tus Apellidos" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Usuario</label>
                <div class="input-wrapper">
                <input type="text" placeholder="Crea tu nombre de usuario" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Correo Electronico</label>
                <div class="input-wrapper">
                <input type="email" placeholder="Ingresa tu correo electronico" className="form-input" />
                </div>
            </div>

            <div class="form-group">
                <label className="form-label">Contraseña</label>
                <div className="input-wrapper">
                <input type="password" placeholder="Crea una contraseña segura" class="form-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {showPasswordError && (
                    <p className="error-message">La contraseña debe tener al menos 8 caracteres</p>
                )}
            </div>

            <div className="button-wrapper">
                <button type="submit" className="submit-button">Registrarme</button>
            </div>
            </form>
        </div>
        </main>
        </>
    )
}

export default Form_Registration;
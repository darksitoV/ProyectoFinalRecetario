import './HeaderSessionStarted.css';
import { useAuth } from '../../AuthContext';
import EditUserModal from '../EditUser/EditUserModal';
import { useState } from 'react';

function HeaderSessionStarted() {
    const { user, updateUser, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [modalField, setModalField] = useState(null); // username | email | password

    const toggleMenu = () => setShowMenu(!showMenu);
    const closeModal = () => setModalField(null);

    const handleSave = async (newValue) => {
        if (modalField === 'username') {
            await updateUser({ username: newValue });
        } else if (modalField === 'email') {
           await updateUser({ email: newValue });
        } else if (modalField === 'password') {
           await updateUser({ password: newValue });
        }
        closeModal();
    };
    const handleLogout = async () => {
        await logout();
        window.location.href = '/login';
    };

    return (
        <>
        <header className="site-header">
            <nav className="main-nav">
                <div className="brand-container">
                    <div className="logo-wrapper">
                        <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a003168fea05fe300258f75f28ec9682651fefe6?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                            alt="Site Logo"
                            className="logo-image-HeaderSessionStarted"
                        />
                    </div>
                    <h1 className="site-title">Mi Recetario.com</h1>
                </div>

                <div className="nav-links">
                    {/* Otras secciones */}
                    <a href="#" className="nav-item">Inventario</a>
                    <a href="#" className="nav-item">Recetas</a>
                    <a href="#" className="nav-item">Gastos</a>

                    <div className="user-profile" onClick={toggleMenu}>
                        <span className="user-name">{user.username}</span>
                        <div className="user-icon-wrapper">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2aaab3485994b1bed21dcf27b74908cf785c40d?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                                alt="User Profile"
                                className="user-icon"
                            />
                        </div>

                {showMenu && (
                    <div className="user-dropdown">
                        <button onClick={() => setModalField('username')}>Cambiar usuario</button>
                        <button onClick={() => setModalField('email')}>Cambiar email</button>
                        <button onClick={() => setModalField('password')}>Cambiar contraseña</button>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                )}
                    </div>
                </div>
            </nav>

            {modalField && (
                <EditUserModal
                    field={modalField}
                    label={
                        modalField === 'username'
                            ? 'Nuevo nombre de usuario'
                            : modalField === 'email'
                            ? 'Nuevo email'
                            : 'Nueva contraseña'
                    }
                    value={modalField !== 'password' ? user[modalField] : ''}
                    onSave={handleSave}
                    onClose={closeModal}
                />
            )}
        </header>
        </>
    );
}

export default HeaderSessionStarted;
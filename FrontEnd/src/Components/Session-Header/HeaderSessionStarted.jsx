import './HeaderSessionStarted.css';
import { useAuth } from '../../AuthContext';

function HeaderSessionStarted() {
    const { user } = useAuth();

    return (
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
                    <a href="#" className="nav-item">
                        <div className="nav-icon-wrapper">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                                alt="Inventory Icon"
                                className="nav-icon"
                            />
                        </div>
                        <span className="nav-text">Inventario</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon-wrapper">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                                alt="Recipes Icon"
                                className="nav-icon"
                            />
                        </div>
                        <span className="nav-text">Recetas</span>
                    </a>
                    <a href="#" className="nav-item">
                        <div className="nav-icon-wrapper">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                                alt="Expenses Icon"
                                className="nav-icon"
                            />
                        </div>
                        <span className="nav-text">Gastos</span>
                    </a>
                    <div className="user-profile">
                        <span className="user-name">{user.username}</span>
                        <div className="user-icon-wrapper">
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2aaab3485994b1bed21dcf27b74908cf785c40d?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                                alt="User Profile"
                                className="user-icon"
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default HeaderSessionStarted;
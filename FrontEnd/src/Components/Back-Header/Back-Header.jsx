import './Back-Header.css'
import { useNavigate } from 'react-router-dom';

function Back_Header() {
    const navigate = useNavigate();
    
    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <>
        <header className="BackHeader">
        <nav className="BackHeader-nav-container">
            <div className="BackHeader-logo-section">
            <div className="BackHeader-logo-wrapper">
                <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ada63c26899fa32d1170cafcff29173b4f42efd3?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                className="BackHeader-logo-image"
                alt="Logo"
                />
            </div>
            <h1 className="BackHeader-site-title">Mi Recetario.com</h1>
            </div>
            <nav className="BackHeader-nav-links">
            <button className="BackHeader-back-button" onClick={handleBackClick}>
                <span className="BackHeader-back-text">Volver</span>
                <span className="BackHeader-icon-wrapper">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/13d0ff668dae6d93692b1b6dda9b54d74e388e12" alt="Back Icon" className="BackHeader-back-icon" />
                </span>
            </button>
            </nav>
        </nav>
        </header>
        </>
    )
}

export default Back_Header;
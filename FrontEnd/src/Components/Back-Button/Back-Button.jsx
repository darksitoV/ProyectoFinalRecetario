import './Back-Button.css';
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <button className="back-button" onClick={handleBackClick}>
            Volver
        </button>
    );
}

export default BackButton;
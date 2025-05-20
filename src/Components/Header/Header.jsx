import './Header.css'

function Header() {
    return (
        <>
        <header class="header">
        <nav class="nav-container">
            <div class="logo-section">
            <div class="logo-wrapper">
                <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ada63c26899fa32d1170cafcff29173b4f42efd3?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                class="logo-image"
                alt="Logo"
                />
            </div>
            <h1 class="site-title">Mi Recetario.com</h1>
            </div>
            <div class="nav-links">
            <a href="#" class="nav-link">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="nav-icon"
                    alt="Inventario icon"
                />
                </div>
                <span class="nav-text">Inventario</span>
            </a>
            <a href="#" class="nav-link">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="nav-icon"
                    alt="Recetas icon"
                />
                </div>
                <span class="nav-text">Recetas</span>
            </a>
            <a href="#" class="nav-link">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="nav-icon"
                    alt="Gastos icon"
                />
                </div>
                <span class="nav-text">Gastos</span>
            </a>
            </div>
        </nav>
        </header>
        </>
    )
}

export default Header;
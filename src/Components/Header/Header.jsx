import './Header.css'

function Header() {
    return (
        <>
        <header class="HeaderNos">
        <nav class="HeaderNos-nav-container">
            <div class="HeaderNos-logo-section">
            <div class="HeaderNos-logo-wrapper">
                <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ada63c26899fa32d1170cafcff29173b4f42efd3?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                class="HeaderNos-logo-image"
                alt="Logo"
                />
            </div>
            <h1 class="HeaderNos-site-title">Mi Recetario.com</h1>
            </div>
            <div class="HeaderNos-nav-links">
            <a href="#" class="HeaderNos-nav-link">
                <div class="HeaderNos-nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="HeaderNos-nav-icon"
                    alt="Inventario icon"
                />
                </div>
                <span class="HeaderNos-nav-text">Inventario</span>
            </a>
            <a href="#" class="HeaderNos-nav-link">
                <div class="HeaderNos-nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="HeaderNos-nav-icon"
                    alt="Recetas icon"
                />
                </div>
                <span class="HeaderNos-nav-text">Recetas</span>
            </a>
            <a href="#" class="HeaderNos-nav-link">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    class="HeaderNos-nav-icon"
                    alt="Gastos icon"
                />
                </div>
                <span class="HeaderNos-nav-text">Gastos</span>
            </a>
            </div>
        </nav>
        </header>
        </>
    )
}

export default Header;
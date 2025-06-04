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
        </nav>
        </header>
        </>
    )
}

export default Header;
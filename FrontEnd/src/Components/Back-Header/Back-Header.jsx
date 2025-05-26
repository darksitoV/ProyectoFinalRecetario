import './Back-Header.css'

function Back_Header() {

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
        </nav>
        </header>
        </>
    )
}

export default Back_Header;
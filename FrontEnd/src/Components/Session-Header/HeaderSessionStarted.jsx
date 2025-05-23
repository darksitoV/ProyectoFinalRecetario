import './HeaderSessionStarted.css'


function HeaderSessionStarted() {
    return(
        <>
        
        <header class="site-header">
        <nav class="main-nav">
            <div class="brand-container">
            <div class="logo-wrapper">
                <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a003168fea05fe300258f75f28ec9682651fefe6?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                alt="Site Logo"
                class="logo-image"
                />
            </div>
            <h1 class="site-title">Mi Recetario.com</h1>
            </div>
            <div class="nav-links">
            <a href="#" class="nav-item">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    alt="Inventory Icon"
                    class="nav-icon"
                />
                </div>
                <span class="nav-text">Inventario</span>
            </a>
            <a href="#" class="nav-item">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    alt="Recipes Icon"
                    class="nav-icon"
                />
                </div>
                <span class="nav-text">Recetas</span>
            </a>
            <a href="#" class="nav-item">
                <div class="nav-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8898f37546d94ae624a3bffc3bd66539d886f397?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    alt="Expenses Icon"
                    class="nav-icon"
                />
                </div>
                <span class="nav-text">Gastos</span>
            </a>
            <div class="user-profile">
                <span class="user-name">Name of User</span>
                <div class="user-icon-wrapper">
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2aaab3485994b1bed21dcf27b74908cf785c40d?placeholderIfAbsent=true&apiKey=d125c4bf0ab14f11b1e2846a04664086"
                    alt="User Profile"
                    class="user-icon"
                />
                </div>
            </div>
            </div>
        </nav>
        </header>

        </>
    )
};


export default HeaderSessionStarted;
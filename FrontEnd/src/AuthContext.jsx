import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    
    const [authState, setAuthState] = useState(() => {
        const storedData = sessionStorage.getItem('authData'); // <-- CAMBIADO
        return storedData ? {
            user: JSON.parse(storedData),
            isAuthenticated: true,
            loading: false
        } : {
            user: null,
            isAuthenticated: false,
            loading: true
        };
    });


    // Verificación de sesión al montar el componente
    useEffect(() => {
        const verifyStoredSession = async () => {
            if (authState.isAuthenticated) {
                try {
                    const isValid = await verifySession(authState.user.id);
                    if (!isValid) {
                        clearAuthData();
                    }
                } catch (error) {
                    console.error("Error verifying session:", error);
                    clearAuthData();
                }
            }
            // Marcar como no loading independientemente del resultado
            setAuthState(prev => ({ ...prev, loading: false }));
        };

        verifyStoredSession();
    }, []);

    // Función de verificación mejorada
    const verifySession = async (userId) => {
        try {
            const response = await fetch(`/api/verify-session?user_id=${userId}`, {
                credentials: 'include' // Para cookies de sesión
            });
            
            if (!response.ok) {
                throw new Error("Sesión inválida");
            }
            return true;
        } catch (error) {
            console.error("Error al verificar sesión:", error);
            return false;
        }
    };

    // Login optimizado
    const login = async (apiResponse) => {
        if (!apiResponse?.id_usuario) {
            throw new Error("Datos de usuario inválidos");
        }

        const userData = {
            id: apiResponse.id_usuario,
            username: apiResponse.usuario,
            firstName: apiResponse.nombre_usuario,
            lastName: apiResponse.apellido_usuario,
            birthDate: apiResponse.fecha_nacimiento,
            email: apiResponse.correo,
            role: apiResponse.rol
        };
        // Guardar datos de usuario en sessionStorage
       sessionStorage.setItem('authData', JSON.stringify(userData));
        // Actualizar el estado de autenticación
        setAuthState({
            user: userData,
            isAuthenticated: true,
            loading: false
        });
    };

    // Logout mejorado
    const logout = async () => {
        try {
            await fetch('/api/logout', { // Endpoint para cerrar sesión en backend
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            clearAuthData();
        }
    };

// Actualizar usuario con validación
const updateUser = async (updatedData) => {
    if (!authState.user) return;

    const userId = authState.user.id;
    let endpoint = '';
    let payload = {};

    if (updatedData.username) {
        endpoint = `https://proyectofinalrecetario.onrender.com/actualizar_nombreUsuario/${userId}`;
        payload = { usuario: updatedData.username };
    } else if (updatedData.email) {
        endpoint = `https://proyectofinalrecetario.onrender.com/actualizar_correo/${userId}`;
        payload = { nuevoCorreo: updatedData.email };
    } else if (updatedData.password) {
        endpoint = `https://proyectofinalrecetario.onrender.com/actualizar_password/${userId}`;
        payload = { nuevaContraseña: updatedData.password };
    } else {
        console.warn("No se especificó ningún campo válido para actualizar.");
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || "Error al actualizar");
        }

        // Actualizar estado local solo si no es contraseña
        if (!updatedData.password) {
            const newUserData = {
                ...authState.user,
                ...(
                    updatedData.username
                        ? { username: updatedData.username }
                        : updatedData.email
                        ? { email: updatedData.email }
                        : {}
                )
            };
            setAuthState({
                user: newUserData,
                isAuthenticated: true,
                loading: false
            });
            sessionStorage.setItem('authData', JSON.stringify(newUserData));
        }

    } catch (error) {
        console.error("Error actualizando el usuario:", error);
        throw error;
    }
};


    // Limpieza de datos (ahora es privada)
    const clearAuthData = () => {
        localStorage.removeItem('authData');
        setAuthState({
            user: null,
            isAuthenticated: false,
            loading: false
        });
    };

    // UpdateUser sin cambios (ya está bien implementado)

    return (
        <AuthContext.Provider value={{
            ...authState,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
}
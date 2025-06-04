import './RegisterIngredients.css';
import { useState } from 'react';
import { useAuth } from '../../AuthContext';
import BackButton from '../../Components/Back-Button/Back-Button';

function RegisterIngredients() {
const { user } = useAuth();
const [ingredients, setIngredients] = useState([]);
const [formData, setFormData] = useState({
    name: "",
    quantity: 0,
    unit: "",
    price: 0,
});

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.type === "number" 
            ? parseFloat(e.target.value) || 0  // Evita NaN
            : e.target.value,
    });
};

const addIngredient = (e) => {
    e.preventDefault();
    // Validar campos requeridos
    if (!formData.name || formData.quantity <= 0 || formData.price <= 0) {
        alert("Nombre, cantidad y precio son obligatorios (y mayores a 0)");
        return;
    }
    setIngredients([...ingredients, { ...formData, id: Date.now() }]);
    setFormData({ name: "", quantity: 0, unit: "", price: 0 });
};

const deleteIngredient = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
};

const editIngredient = (id) => {
    const toEdit = ingredients.find((item) => item.id === id);
    setFormData(toEdit);
    setIngredients(ingredients.filter((item) => item.id !== id));
};

const saveToDatabase = async () => {
    if (ingredients.length === 0) {
        alert("No hay ingredientes para guardar");
        return;
    }

    try {
        const formattedIngredients = ingredients.map(ing => ({
            nombre: ing.name,
            cantidad: ing.quantity,
            unidad_medida: ing.unit,
            costo: ing.price
        }));

        const res = await fetch(`https://proyectofinalrecetario.onrender.com/${user.id}/gestion_ingredientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedIngredients),
        });

        if (res.ok) {
            alert("Ingredientes guardados correctamente");
            setIngredients([]);
        } else {
            const errorData = await res.json();
            alert(`Error al guardar: ${errorData.error || "Revisa los datos"}`);
        }
    } catch (err) {
        console.error(err);
        alert("Error de red al guardar los ingredientes");
    }
};

    return (
        <>
            <header className="title-container">
                <h1 className="page-title">Gestión de Ingredientes</h1>
                <nav className="user-navigation">
                    <div className="nav-container">
                        <BackButton/>
                    </div>
                </nav>
            </header>

            <div className='container_RegisterIngredients'>
                <div className="content_IngredientForm">
                <form className="ingredient_form" onSubmit={addIngredient}>
                    <h2 className="form_title">Agregar nuevo ingrediente</h2>

                    <div className="RegisterIngredient_form_group">
                    <label>Nombre del ingrediente</label>
                    <input
                        type="text"
                        name="name"
                        className='RegisterIngredient_form_input'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej: Harina de trigo"
                        onInput={(e) => {e.target.value = e.target.value.toUpperCase()}}
                        required
                    />
                    </div>

                    <div className="RegisterIngredient_form_group">
                    <label>Cantidad</label>
                    <input
                        type="number"
                        name="quantity"
                        className='RegisterIngredient_form_input'
                        value={formData.quantity}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                    </div>

                    <div className="RegisterIngredient_form_group">
                    <label>Unidad</label>
                    <select
                        name="unit"
                        value={formData.unit}
                        className='RegisterIngredient_form_input'
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Seleccione</option>
                        <option value="Kg">Kg</option>
                        <option value="Pz">Pz</option>
                    </select>
                    </div>

                    <div className="RegisterIngredient_form_group">
                    <label>Precio por Unidad</label>
                    <input
                        type="number"
                        name="price"
                        className='RegisterIngredient_form_input'
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                    </div>

                    <div className="RegisterIngredient_form_group_button">
                    <button className='RegisterIngredient_button' type="submit">Agregar a tabla</button>
                    </div>
                </form>

                    <div className="ingredient_table_container">
                        <h2>Ingredientes añadidos</h2>
                        <table border="1" >
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Unidad</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ingredients.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.unit}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                <button onClick={() => editIngredient(item.id)}>Editar</button>
                                <button onClick={() => deleteIngredient(item.id)}>Eliminar</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>

                        {ingredients.length > 0 && (
                        <button style={{ marginTop: "1rem" }} onClick={saveToDatabase}>
                            Guardar en base de datos
                        </button>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default RegisterIngredients;
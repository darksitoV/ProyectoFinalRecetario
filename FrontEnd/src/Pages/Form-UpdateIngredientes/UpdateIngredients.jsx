import './UpdateIngredients.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import BackButton from '../../Components/Back-Button/Back-Button';
import loadingComponent from '../../Components/Loading/Loader';

function UpdateIngredients() {
    const { user } = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        name: "",
        quantity: "",
        unit: "",
        price: "",
    });

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${user.id}/ver_ingredientes`);
                if (!response.ok) throw new Error('No se pudieron cargar los ingredientes');
                const data = await response.json();
                const formattedIngredients = data.map(ing => ({
                    id: ing.id_ingrediente,
                    name: ing.nombre,
                    quantity: parseFloat(ing.cantidad),
                    unit: ing.unidad_medida,
                    price: parseFloat(ing.costo)
                }));
                setIngredients(formattedIngredients);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchIngredients();
    }, [user.id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "number") {
            if (value === "" || /^[0-9]*\.?[0-9]{0,2}$/.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || formData.quantity === "" || formData.price === "") {
            alert("Completa todos los campos obligatorios");
            return;
        }

        const updatedIngredient = {
            id_ingrediente: formData.id,
            nombre: formData.name,
            cantidad: formData.quantity,
            unidad_medida: formData.unit,
            costo: formData.price
        };

        try {
            const res = await fetch(`http://localhost:3000/${user.id}/${formData.id}/ingredientes`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedIngredient)
            });

            if (!res.ok) throw new Error("Error al actualizar ingrediente");

            const updatedList = ingredients.map(ing =>
                ing.id === formData.id ? {
                    ...ing,
                    quantity: parseFloat(formData.quantity),
                    unit: formData.unit,
                    price: parseFloat(formData.price)
                } : ing
            );
            setIngredients(updatedList);
            setFormData({ id: null, name: "", quantity: "", unit: "", price: "" });
            alert("Ingrediente actualizado correctamente");
        } catch (err) {
            alert(err.message);
        }
    };

    const deleteIngredient = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/${user.id}/ingredientes/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error('Error al eliminar el ingrediente');
            setIngredients(ingredients.filter((item) => item.id !== id));
        } catch (err) {
            alert(err.message);
        }
    };

    const editIngredient = (id) => {
        const toEdit = ingredients.find((item) => item.id === id);
        setFormData({
            id: toEdit.id,
            name: toEdit.name,
            quantity: toEdit.quantity.toString(),
            unit: toEdit.unit,
            price: toEdit.price.toString(),
        });
    };

    if (loading) return <div>{loadingComponent()}</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <header className='title_container_UpdtaeIngredients'>
                <h1 className="page_title_UpdateIngredients">Gestión de Ingredientes</h1>
                <nav className="user_navigation_UpdateIngredients">
                    <div className="nav_container_UpdateIngredients">
                        <BackButton />
                    </div>
                </nav>
            </header>

            <div className='container_updateIngredients'>
                <div className="content_IngredientUpdate">
                    <div className="ingredient-form">
                        <h2>{formData.id ? "Editar Ingrediente" : "Agregar Nuevo Ingrediente"}</h2>
                        <form className='form_updategroup' onSubmit={handleSubmit}>
                            <div className='form_group'>
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    name="name"
                                    className='RegisterIngredient_form_input'
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!!formData.id}
                                    required
                                />
                            </div>
                            <div className='form_group'>
                                <label>Cantidad:</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    className='RegisterIngredient_form_input'
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className='form_group'>
                                <label>Unidad de medida:</label>
                                <input
                                    type="text"
                                    name="unit"
                                    className='RegisterIngredient_form_input'
                                    value={formData.unit}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='form_group'>
                                <label>Precio:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    className='RegisterIngredient_form_input'
                                    onChange={handleChange}
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div className='btn_update_ingredient_wrapper'>
                                <button className='btn_update_ingredient' type="submit">
                                    {formData.id ? "Actualizar Ingrediente" : "Agregar Ingrediente"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="updateIngredient_table_container">
                        <h2 className='title_tableUpdate'>Ingredientes</h2>
                        {ingredients.length > 0 ? (
                            <>
                                <table border="1">
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
                                                <td>{item.unit || '-'}</td>
                                                <td>${item.price.toFixed(2)}</td>
                                                <td className='btn_update_ingredient_table'>
                                                    <button onClick={() => editIngredient(item.id)}>Editar</button>
                                                    <button onClick={() => deleteIngredient(item.id)}>Eliminar</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <p>No hay ingredientes registrados</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateIngredients;
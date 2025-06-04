import React, { useState } from 'react';
import './EditUserModal.css';

function EditUserModal({ field, label, value, onSave, onClose }) {
    const [inputValue, setInputValue] = useState(value || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSave(inputValue.trim());
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{label}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type={field === 'password' ? 'password' : 'text'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        required
                    />
                    <div className="modal-buttons">
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserModal;
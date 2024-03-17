// CityInfoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
const CityInfoModal = ({ isOpen, closeModal, onSubmit, title, labels }) => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        // Call the onSubmit callback with the form data
        onSubmit(formData);
        // Clear form data after submission
        setFormData({});
        // Close the modal
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel={title}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                },
                content: {
                    width: '80%',
                    maxWidth: '600px',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                },
            }}
        >
            <h2>{title}</h2>
            {labels.map(({ name, label, type }) => (
                <div key={name}>
                    <label>
                        {label}:
                        {type === 'text' ? (
                            <input
                                type="text"
                                value={formData[name] || ''}
                                onChange={(e) => handleInputChange(name, e.target.value)}
                            />
                        ) : (
                            <input
                                type="number"
                                value={formData[name] || ''}
                                onChange={(e) => handleInputChange(name, e.target.value)}
                            />
                        )}
                    </label>
                </div>
            ))}
            <br />
            <button className='btn101' onClick={handleSubmit}>Submit</button>
        </Modal>
    );
};

export default CityInfoModal;

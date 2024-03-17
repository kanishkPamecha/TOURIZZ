// TransportInfoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
const TransportInfoModal = ({ isOpen, closeModal, onSubmit, title, modes }) => {
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
      <label>
        Transport Name:
        <input
          type="text"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </label>
      <label>
        Mode:
        <select
          value={formData.mode || ''}
          onChange={(e) => handleInputChange('mode', e.target.value)}
        >
          {modes.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </label>
      <label>
        From:
        <input
          type="text"
          value={formData.from || ''}
          onChange={(e) => handleInputChange('from', e.target.value)}
        />
      </label>
      <label>
        To:
        <input
          type="text"
          value={formData.to || ''}
          onChange={(e) => handleInputChange('to', e.target.value)}
        />
      </label>
      <br />
      <button className='btn101' onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default TransportInfoModal;

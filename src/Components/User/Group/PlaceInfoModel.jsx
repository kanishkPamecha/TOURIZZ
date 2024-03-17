// PlaceInfoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
const PlaceInfoModal = ({ isOpen, closeModal, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    stopTime: '',
  });

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    // Call the onSubmit callback with the form data
    onSubmit(formData);
    // Clear form data after submission
    setFormData({
      name: '',
      startTime: '',
      stopTime: '',
    });
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
        Place Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </label>
      <label>
        Start Time:
        <input
          type="time"
          value={formData.startTime}
          onChange={(e) => handleInputChange('startTime', e.target.value)}
        />
      </label>
      <label>
        Stop Time:
        <input
          type="time"
          value={formData.stopTime}
          onChange={(e) => handleInputChange('stopTime', e.target.value)}
        />
      </label>
      <br />
      <button className='btn101' onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default PlaceInfoModal;

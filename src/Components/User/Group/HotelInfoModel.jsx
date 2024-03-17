// HotelInfoModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import './Modal.css';
const HotelInfoModal = ({ isOpen, closeModal, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    checkInTime: '',
    checkOutTime: '',
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
      checkInTime: '',
      checkOutTime: '',
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
        Hotel Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </label>
      <label>
        Check-in Time:
        <input
        type="date"
          value={formData.checkInTime}
          onChange={(e) => handleInputChange('checkInTime', e.target.value)}
        />
      </label>
  
      <label>
        Check-out Time:
        <input
         type="date"
          value={formData.checkOutTime}
          onChange={(e) => handleInputChange('checkOutTime', e.target.value)}
        />
      </label>
      <br />
      <button  className='btn101'onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

// Either default export
export default HotelInfoModal;

// Or named export
// export { HotelInfoModal };


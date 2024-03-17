import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminsPage() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/AdminF');
    }; return (
        <div>
            <button onClick={handleClick}>Hotel</button><button>Bus</button> <button>Flight</button></div>
    );
}

export default AdminsPage;

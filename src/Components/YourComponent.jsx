import React, { useContext } from 'react';
import { userEmailContext } from '../Components/User/Navbar'; 

const YourComponent = ({userEmail}) => {


  return (
    <div>Email: {userEmail}</div>
  );
};

export default YourComponent;

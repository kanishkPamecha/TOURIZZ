import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
function ModifyBus() {
    const nav = useNavigate();
    const NavToInfoBus=() =>{
        nav('/InfoBus');
    }
  return (
    <div>
        <div>
        Current Buse Fetch 
        </div>
  <div>
    <button  onClick={NavToInfoBus}>Add New Bus </button>
  </div>

    </div>
  )
}

export default ModifyBus

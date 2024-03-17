import React, { useState } from 'react';
import '../User/navbar.css'; // Assuming you have a CSS file named 'navbar.css'

function Navbar1() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className={`d-flex ${sidebarOpen ? 'toggled' : 'non'}`} id="wrapper" style={{marginTop:'-10px',position:'absolute'}}>
            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action bg-light">Modify Bus's</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light"> Modify class</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light"> Next Bookings</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Total Income</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">History</a>

                </div>
            </div>
            <div id="page-content-wrapper">
                <button className="btn btn-light" id="menu-toggle" onClick={toggleSidebar}style={{zIndex:'1000',position:'fixed'}}>
                  hii
                    <i className={`fa ${sidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
                </button>
                <div className="container-fluid">
                    {/* 3201 */}
                </div>
            </div>
            {/* <div>
               Current Booking 
                 <div className='back-122' style={{minHeight:'50px',minWidth:'100%',backgroundColor:'wheat'}}> 
                 hello
                 <div style={{minHeight:'50px',minWidth:'100%'}}></div></div>
                </div> */}
        </div>
    );
}

export default Navbar1;

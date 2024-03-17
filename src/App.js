import './App.css';
import { useEffect } from 'react';
import Home from './Components/User/Home';
import Navbar from './Components/User/Navbar';
import React, { useState } from 'react';
import Slider1 from './Components/User/Slider1';
import Slider from './Components/User/Slider';
import Prepaid from './Components/User/Prepaid.js';
import PackageDetail from './Components/User/Planes/Prepaid';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import Hotel from './Components/User/Hotel/Hotel';
import GroupBooking from './Components/User/Group/Group_Booking';
import '../src/Components/User/Sign.css';
// import Group from './Components/User/Group';
import HotelHome from './Components/User/Hotel/HotelHome'
import Hotelsearch from './Components/User/Hotel/Hotelsearch';
import Buses from './Components/User/Buses/Buses';
import Hotelroom from './Components/User/Hotel/Hotelroom';
import IRCTCSearch from './Components/User/Train/IRCTCSearch';
import IRCTCPNR from './Components/User/Train/IRCTCPNR ';
import IRCTCStatus from './Components/User/Train/IRCTCStatus';
import Contact from './Components/User/Contact';
import Train from './Components/User/Train/Train';
import F from './Components/User/Flight/F';
import Customer from './Components/User/Customer';
// import Admin_Hotel from './Components/Admin_hotels/one';
import Admin_Hotel from './Components/Admin_hotels/Admin_Hotel';
import Planes from './Components/User/Planes/Planes';
import Packages1 from './Components/User/Planes/Packages';
import PackagesInfo from './Components/User/Planes/Prepaid';
import AdminF from './Components/Admin_bus/AdminF';
import AdminofAdmin from './Components/Admin/AdminofAdmin';
import InfoBus from './Components/Admin_bus/InfoBus';
import Admin_panel from './Components/Admin_bus/Admin_panel';
import Captcha from './Components/User/Captcha';
import Wallet from './Components/Wallet/wallet';
import FlightPage from './Components/Admin_Flight/AdminFlight';
import First from './Components/Admin_Flight/first';
import FlightPage1 from './Components/Admin_Flight/FlightPage';
import Error from './Erroe/Error';
import Success from './Components/User/Success';
import FlightFareComponent from './Components/User/Flight/F';
import CreateRoom from './Components/Admin_hotels/CreateRoom';
import FetchBookings from './Components/Admin_hotels/FetchBookings';
import FetchRooms from './Components/Admin_hotels/FetchRooms';
import AddBooking from './Components/Admin_hotels/AddBooking';
import Search from './Components/User/Planes/search';
import Navbar1 from './Components/Admin_hotels/Navbar1.jsx';
import Payment from './Components/User/Hotel/Payment';
import CreatePlane from './Components/User/Planes/createplan';
import CreateActivity from './Components/Activity/crateActivity'
import Map from './Components/Map'
import Search11 from './Components/User/Hotel/Search.jsx'
import YourComponent from './Components/YourComponent.jsx';
import { userEmailContext } from '../src/Components/User/Navbar.js'; // Adjust the import path as needed
import AdminsPage from './Components/Admin/AdminsPage.jsx';
import LoginAdminBus from './Components/Admin_bus/LoginAdminBus.jsx'
import Mobile from './Components/User/Hotel/Mobile.jsx';
import Ai from './Components/Ai/Ai.jsx';
import One from './Components/Admin_hotels/one.jsx';
import BusInterface from './Components/User/Buses/BusInterface.jsx';
import ConfirmFlight from './Components/User/Flight/ConfirmFlight.jsx';
import AdminUser from './Components/Admin_Flight/AdminUser.jsx';
import MainPage from './Components/Admin_bus/MainPageBus.jsx';
import NavbarBus from './Components/Admin_bus/NavbarBus.jsx';

function App() {


  useEffect(() => {
    // ... (your existing code)

    const storedUserEmail = localStorage.getItem('userEmail');
    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }
  })

  const [userEmail, setUserEmail] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      console.log(userEmail)
      setIsMobile(window.innerWidth < 768); // Assuming mobile devices have width less than 768px
    };
    // Set initial state on component mount
    handleResize();
    // Attach event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const hotels = [
    { id: 1, name: 'Hotel A', price: 100 },
    { id: 2, name: 'Hotel B', price: 200 },
    { id: 3, name: 'Hotel C', price: 300 },
  ];

  console.log(userEmail)
  return (
    <div className="App">
      <div className='background_main'>
        <Router>


          <div className="App">



            <Routes>  
    {/* User */}
           {/* HomePage  */}
               {isMobile ? <Route path="/" element={[<Navbar activeTab={"Home"} />, <YourComponent userEmail={userEmail} />, <Home />, <Packages1 />, <Prepaid />]} /> : <Route path="/" element={[<Navbar activeTab={"Home"} />, <YourComponent userEmail={userEmail} /> , <Packages1 />, <Home />, <Prepaid />]} />}
      {/*  ,<Slider /> */}
      {/* Train Page   */}
              <Route path="/IRCTCSearch" element={[<Navbar activeTab={"train"} />, <IRCTCSearch />]} />
              <Route path="/flights" element={[<Navbar activeTab={"Flights"} />, <FlightFareComponent />]} />
              <Route path="/Group_B" element={[<Navbar activeTab={"GroupPlan"} />, <GroupBooking />]} />
              <Route path="/Prepaid" element={[<Prepaid />]} />
              <Route path="/Buses" element={[<Navbar activeTab={"Buses"} />, <Buses />]} />
              <Route path="/hotel" element={[<Navbar activeTab={"Hotels"} />, <HotelHome />]} />
              <Route path="/search-results" element={<Search11 />} />
              <Route path="/Hotel/:id" element={<Hotel  />} />
              <Route path="/CareUs" element={[<Navbar activeTab={"ccs"} />, <Customer />]} />
              <Route path="/Wallet" element={[<Navbar activeTab={"Wallet"} />, <Wallet />]} />
              <Route path="/packages " element={[<PackageDetail />]} />
              <Route path="/package-info" element={<PackagesInfo />} />
              <Route path="/Admin" element={<AdminsPage />} />
              <Route path="/Admin_panel" element={<Admin_panel />} />
              <Route path="/BusId" element={<BusInterface />} /> 
     { /* Ai  */}
              <Route path="/AI" element={<Ai />} />
     {/* Flight */}
              <Route path="/ConfirmFlight" element={[ <Navbar />, <ConfirmFlight  /> ]} />
     {/* Bus-admin */}
              <Route path="/InfoBu" element={[< FetchBookings/>,<InfoBus/> ]} />
              <Route path="/InfoBus" element={< InfoBus />} />
              <Route path="/AdminB" element={<LoginAdminBus />} />
              <Route path="/AdminF" element={[<Navbar />,    <Admin_Hotel/>]} />
           
              <Route path="/Main" element={[  <NavbarBus/>,   <MainPage/>]} />
    {/* Package */}
              <Route path="/base-admin" element={[<Navbar1 />, <CreatePlane />]} />
    {/* Hotel-Admin */}
              <Route path="/Hotel-admin" element={[<CreateRoom />]} />
              <Route path="/AddBooking" element={[<AddBooking/>]} />
              <Route path="/Hotel-Create_room" element={[<Navbar1 />, <One />]} />
    {/* Payment */}
              <Route path="/Payment" element={[<Payment />]} />
    {/*  Flight Admin */}
              <Route path="/Flight_database" element={[<Navbar />, <FlightPage />]} />
              <Route path="/FlightPage1" element={< FlightPage1 />} />
              <Route path="/AdminUser" element={[<Navbar1 />,< AdminUser />]} />
              {/* <Route path="/AddBookingFlight" element={[<AddBooking/>]} /> */}
             
    {/* Error */}
               <Route path="*" element={<Error />} />
   </Routes>
          </div>
       

        </Router>
        {/* <Contact /> */}

      </div>
    </div>


  );
}

export default App;

{/* <Route path="/fetch-rooms" element={[<Navbar />, <FetchRooms />]} />
<Route path="/fetch-bookings" element={[<Navbar />, <FetchBookings />]} />
<Route path="/Add-bookings" element={[<Navbar />, <AddBooking />]} />
*/}
{/* <Route path="/admin_panel" element={[<Navbar />, <Admin_panel />]} />
<Route path="/AdminAdmin" element={[<Navbar />, <AdminofAdmin />]} /> */}
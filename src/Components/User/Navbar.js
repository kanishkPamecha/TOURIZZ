import './navbar.css';
import './PopUp.css';
import React, { useState, useEffect, useCallback } from 'react';
import userImage from '../../images/Agra.jpg'
import axios from 'axios';
import home from '../../pngiMAGE/Plan.png';
import hotel from '../../pngiMAGE/hotel.png'
import train from '../../pngiMAGE/TRAIN.png';
import bus from '../../pngiMAGE/bus.png';
import group from '../../pngiMAGE/GROUP.png';
import flight from '../../pngiMAGE/FLOIGHT.png';
import login from '../../pngiMAGE/loGIN.png'
import Cookies from 'js-cookie';
import image from '../../images/logo1921.png'
import contact from '../../pngiMAGE/cONTACT.png'
import wallet from '../../pngiMAGE/wALLET.png';
import YourComponent from '../YourComponent';
export let isLoggedInContext = React.createContext();
export let userEmailContext = React.createContext();



export default function Navbar({ activeTab}) {

  const [userEmail, setUserEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const[password,setpassword] =useState('');
   const[password1,setpassword1] =useState('');

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const [Repassword, setRepassword] = useState('');
  const [mobileNumber, setmobileNumber] = useState('');
  const [showPop, setShowPop] = useState(false);
  const [showLoginPop, setShowLoginPop] = useState(false);
  const [Logout, setLogout] = useState(false);

  // const [activeTab, setActiveTab] = useState('Home');

  // const handleTabClick = useCallback((tab) => {
  //   setActiveTab(tab);
  //   console.log(tab);
  // }, [setActiveTab]);

  useEffect(() => {
    
  }, [activeTab]);


const handleLogoutClick =()=>{
  setLogout(true);
}
 
  const onClose =()=>{
    setShowLoginPop(false);
    setShowPop(false);
  }


  

  const handleLoginToggle = (e) => {
   setShowLoginPop(true);
    setShowPop(false);
  };
  const handleTogglePop = () => {
    setShowLoginPop(false);
    setShowPop(true);
  };
  useEffect(() => {
    const storedLoginStatus = Cookies.get('isLoggedIn');
    const storedUserEmail = localStorage.getItem('userEmail');

    if (storedLoginStatus === 'true' && storedUserEmail) {
      setIsLoggedIn(true);
      setUserEmail(storedUserEmail);
    }
  }, []);
  const [selectedAge, setSelectedAge] = useState('');

  const handleChange = (event) => {
    setSelectedAge(event.target.value);
  };

  const handleLogin = () => {
   


  axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data.message === 'Success') {
          // Navigate to the previous tab (assuming it's the previous route)
          // nav(-1);
          // close the pop Up
          onClose();
          setShowLoginPop(false);
          setIsLoggedIn(true);
          setUserEmail(email); 
          Cookies.set('isLoggedIn', 'true', { expires: 1 });
          localStorage.setItem('userEmail', email);
        }
      })
      .catch(err => console.log(err));
    };
    const handleLogout = () => {
      Cookies.remove('isLoggedIn');
      setIsLoggedIn(false);
      setUserEmail(''); 
      localStorage.removeItem('userEmail');
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:3001/register', {
      name: name,
      mobileNumber: mobileNumber,
      email: email,
      password: password,
      Age:selectedAge,
      Repassword: Repassword
    })
    .then(
    (result => console.log(result) ),
    setShowPop(false))
    .catch(err => console.log(err))
  };

  
 

  return (
    <isLoggedInContext.Provider value={isLoggedIn}>
      <userEmailContext.Provider value={userEmail}>
    <div >
      
   
       <nav className="navbar  navbar1 navbar-expand-lg ">
      <div className="container-fluid bg-body-tertiary ">
     
         {
        <span className="navbar-brand" href="#">
  
        <img src={image} alt="" style={{maxHeight:'8vh'}} />
           </span>
     }
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            data-bs-placement="left" 
          >
          
            <span className="navbar-toggler-icon"></span>
          </button> 
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav special_margin me-auto mb-2 mb-lg-0">
            <li className={`nav-item mx-3 ${activeTab === 'Home' ? 'activeTab' : ''}`}>
                <a className="nav-link active" aria-current="page" href="/">
                <img src={home} alt=""  className='image11'/>
                  Home
                </a>
              </li>
              <li   className={`nav-item mx-3 ${activeTab == 'train' ? 'activeTab' : ''}`}>
               <a className="nav-link active"  aria-current="page" href="/IRCTCSearch">
              <img src={train} alt="" className='image11'/> 
                  Trains
                </a>
              </li>
              <li className={`nav-item mx-3 ${activeTab === 'Hotels' ? 'activeTab' : ''}`}>
               <a className="nav-link active" aria-current="page" href="/hotel">
              <img src={hotel} alt="" className='image11'/>  
                  Hotels
                </a>
              </li>
              <li className={`nav-item mx-3 ${activeTab === 'Buses' ? 'activeTab' : ''}`}>
                <a className="nav-link active" aria-current="page" href="/Buses">
              <img src={bus} alt=""className='image11' />
                  Buses
                </a>
              </li>
              <li className={`nav-item mx-3 ${activeTab === 'Flights' ? 'activeTab' : ''}`}>
              <a className="nav-link active" aria-current="page" href="/flights">
              <img src={flight} alt="" className='image11'/>
                  Flights
                </a>
              </li>
              <li className={`nav-item mx-3 ${activeTab === 'GroupPlan' ? 'activeTab' : ''}`}>
               <a className="nav-link active" aria-current="page" href="/Group_B">
              <img src={group} alt="" className='image11'/>
                 <p>Group_Plan </p>
                </a>
              </li> 
              <li className={`nav-item mx-3 ${activeTab === 'Wallet' ? 'activeTab' : ''}`}>
                <a className="nav-link active" aria-current="page" href="/Wallet">
                  <img src={wallet}alt="" className='image11'/>
                Wallet
                </a>
              </li>
            </ul>
          
            <ul className="navbar-nav main_cont me-auto mb-2 mb-lg-0" style={{display:'flex',alignContent:'center',flexWrap:'revert-layer'}}>
            <li className={`nav-item mx-3 ${activeTab === 'login' ? 'activeTab' : ''}`}>
                {/* in this there should LOgin/Sign_in before Login if login is Success full the img should be displayed in place of it */}
                <a className="nav-link active" aria-current="page" href="#" onClick={handleTogglePop} >
                {isLoggedIn ? (
              <img  className='Acc'src={userImage} alt="." onClick={handleLogoutClick}/>
            ) : (
              <a className="nav-link active" aria-current="page" href="#" onClick={handleTogglePop}>

                  <img src={login}alt="" className='image11' />
                Login/Sign Up
              </a>
            )}
                </a>
              </li>
              <li className={`nav-item mx-3 ${activeTab === 'ccs' ? 'activeTab' : ''}`}  >
                <a className="nav-link active l1image" aria-current="page" href="/CareUs"style={{marginTop:'1.5vh'}}>
                <img src={contact}alt="" className='image11'  />

                  Customer care
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showPop &&   
//  <div className='Container'>
//      <h2>Register</h2>
    
//     <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>


//     <div className='inner'>
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setname(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="mobileNumber">Mobile Number:</label>
//         <input
//           type="number"
//           id="mobileNumber"
//           value={mobileNumber}
//           onChange={(e) => setmobileNumber(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setemail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password:</label>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           id="password"
//           value={password}
//           onChange={(e) => setpassword(e.target.value)}
//           className={`password-input ${showPassword ? 'visible' : ''}`}
//         />
        
          
//         <input
//           type="checkbox"
//           id="showPassword"
//           checked={showPassword}
//           onChange={() => setShowPassword(!showPassword)}
//           className="show-password-checkboxa"
//         />
//       </div>
//       <div>
//         <label htmlFor="password">RePassword:</label>
//         <input
//           type={showPassword1 ? 'text' : 'password'}
//           id="Repassword"
//           value={password1}
//           onChange={(e) => setpassword1(e.target.value)}
//           className={`password-input ${showPassword1 ? 'visible' : ''}`}
//         />
//         <input
//           type="checkbox"
//           id="showPassword1"
//           checked={showPassword1}
//           onChange={() => setShowPassword1(!showPassword1)}
//           className="show-password-checkboxa"
//         />
//       </div>
//       <div className='border11' >
//       <label>
//         <input
//           type="radio"
//           value="<20"
//           checked={selectedAge === '<20'}
//           onChange={handleChange}
//         />
//         &lt;20
//       </label>
//       <label>
//         <input
//           type="radio"
//           value="20-40"
//           checked={selectedAge === '20-40'}
//           onChange={handleChange}
//           />
//         20-40
//       </label>

//       <label>
//         <input
//           type="radio"
//           value=">40"
//           checked={selectedAge === '>40'}
//           onChange={handleChange}
//           />
//         &gt;40
//       </label>
          
//           </div>

//       <button className="btn btn-success" type="submit" onClick={handleSubmit}>Register</button>
//     </div>
//     <p>Already have an account? Sign in!</p>
//     <button onClick={handleLoginToggle}>Login</button>
//   </div> 
// }
  
  <div class="main">
       <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>	
  <input type="checkbox" id="chk" aria-hidden="true"/>

    <div class="signup">
      <form>
        <label className='lllabel' for="chk" aria-hidden="true">Sign up</label>
        <input className='iiinput'  type="text" name="txt" placeholder="User name" required=""/>
        <input className='iiinput'  type="email" name="email" placeholder="Email" required=""/>
        <input className='iiinput' type="password" name="pswd" placeholder="Password" required=""/>
        <button className='butttton'>Sign up</button>
      </form>
    </div>

    <div class="login">
      <form>
        <label className='lllabel' for="chk" aria-hidden="true">Login</label>
        <input className='iiinput' type="email" name="email" placeholder="Email" required=""/>
        <input className='iiinput' type="password" name="pswd" placeholder="Password" required=""/>
        <button className='butttton'>Login</button>
      </form>
    </div>
</div>



      }

{
  Logout && 
  <div>
  <h3>Are You sure You want to log out</h3>
  
    <button onClick={handleLogout}>Logout</button>
  </div>
}
     {showLoginPop && (
       <div className='Container limiter'>
        
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
<h2>Login</h2>

<div className='inner'>
<div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
  <div>

  
  <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className={`password-input ${showPassword ? 'visible' : ''}`}
        />
  </div>
 
  <button className="btn btn-success" type="submit" onClick={handleLogin}>Login</button>
  </div>
  <p>Already have an account? Sign in!</p>
    <button onClick={handleTogglePop}>Register</button>
        </div>
      )}

    </div>
    </userEmailContext.Provider>
    </isLoggedInContext.Provider>
  );
}

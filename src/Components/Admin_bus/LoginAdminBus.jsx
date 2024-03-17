import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuccessPage from '../User/Success';
import Admin_panel from './Admin_panel';
// import HoelPage from './HotelPage';
import { useNavigate } from 'react-router-dom';
function App() {
    const [email, setEmail] = useState('');
    const [Pin, setPin] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [prev, setprev] = useState(false);
    const CreateUser = () => {
        setprev(prev => !prev);
    }
    const navigate = useNavigate();


    const [userEmail, setUserEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setpassword] = useState('');
    const [password1, setpassword1] = useState('');
    const [name, setname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [isRegistering, setIsRegistering] = useState(true);
    const [Repassword, setRepassword] = useState('');
  
    const [mobileNumber, setmobileNumber] = useState('');
const Price =0;
 const handleAction = () => {
    if (isRegistering) {
      // Handle registration
      axios
        .post('http://localhost:3001/registerAdmin', { email, password, pin:Pin,Buses:[],Bookings: [] , Price })
        .then((result) => {
          console.log(result);
          if(result.data.message=='User registered successfully'){

            navigate('/InfoBus');

          }
          setMessage(result.data.message);

        })
        .catch((err) => console.log(err));
    } else {
      // Handle login
      axios
        .post('http://localhost:3001/loginAdmin', { email, password })
        .then((result) => {
          console.log(result);
              
          setMessage(result.data.message);
             if(result.data.message=='Login successful')
             {
                navigate('/base-admin');
             }
        })
        .catch((err) => console.log(err));
    }
  };






    return (
        <div>
            {!isRegistering &&
                <div>
                    <h1>Create User</h1>
                    <label htmlFor="Email"> Email</label>
                    <form onSubmit={handleAction}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                        <div>
                            <label htmlFor="password">Password:</label>


                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                placeholder='password'
                                onChange={(e) => setpassword(e.target.value)}
                                className={`password-input ${showPassword ? 'visible' : ''}`}
                            />


                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                style={{ marginTop: '20px' }}
                                onChange={() => setShowPassword(!showPassword)}
                                className="show-password-checkboxa"
                            />


                        </div>
                        <label htmlFor="PIN">PIN</label>
                        <input
                            type="PIN"
                            value={Pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Pin"
                            required
                        />
                     
                    </form>
                </div>}
            {isRegistering &&
                <div>

                    <h2>Register</h2>


                    <div className='inner'>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="mobileNumber">Mobile Number:</label>
                            <input
                                type="number"
                                id="mobileNumber"
                                value={mobileNumber}
                                onChange={(e) => setmobileNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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


                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={() => setShowPassword(!showPassword)}
                                className="show-password-checkboxa"
                            />
                        </div>
                        <div>
                            <label htmlFor="password">RePassword:</label>
                            <input
                                type={showPassword1 ? 'text' : 'password'}
                                id="Repassword"
                                value={password1}
                                onChange={(e) => setpassword1(e.target.value)}
                                className={`password-input ${showPassword1 ? 'visible' : ''}`}
                            />
                            <input
                                type="checkbox"
                                id="showPassword1"
                                checked={showPassword1}
                                onChange={() => setShowPassword1(!showPassword1)}
                                className="show-password-checkboxa"
                            />
                        </div>
                        
                    </div>
                    <p>Already have an account? Sign in!</p>

                </div>

            }
               <button onClick={handleAction}>{isRegistering ? 'Register' : 'Login'}</button>
      {/* Switch between registration and login forms */}
      <button onClick={() => setIsRegistering((prev) => !prev)}>
        {isRegistering ? 'Already have an account? Login' : 'Create an account'}
      </button>
            {/* <button className="btn btn-danger" type="button" onClick={CreateUser}> {prev == false ? "Create User" : "Login"}</button> */}
            <p>{message}</p>
        </div>
        
    );
        
}

export default App;

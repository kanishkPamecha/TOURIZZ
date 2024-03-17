import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import OTP from '../OTP.jsx';

function App() {
    const [email, setEmail] = useState('');
    const [PIN, setPIN] = useState('');
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

    const [Repassword, setRepassword] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');

    const handleLogin = () => { 
        console.log("Hii"+email+password); 
        axios.post('http://127.0.0.1:4008/Flight_admin_login', {
            email: email,
            password: password,
        })
          .then(result => {
            console.log(result);
            console.log('Success');
            
            if (result.data.message === 'Success') {
              console.log('Success');
              navigate(`/FlightPage`, { state: { result } });
              setIsLoggedIn(true);
            }
          })
          .catch(err => console.log(err));
        
    };
    
   
    const handleLogout = () => {
        // Clear the login status cookie
        setIsLoggedIn(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('why me');
        if (password === Repassword) {
            console.log('Req Send')
          axios.post('http://127.0.0.1:4008/create_Flight_admin', {
            name: name,
            mobileNumber: mobileNumber, // Assuming mobileNumber is correct
            password: password,
            email:email,
            PIN: Repassword, // Assuming Repassword is correct
          })
          .then((response) => {
            console.log(response.data);
            navigate('/FlightPage1');
            setMessage('Flight Admin created successfully');
          })
          .catch(error => {
            console.error(error);
            setMessage('An error occurred');
          });
        } else {
          alert("Passwords do 11 not match");
        }
      };
      





    return (
        <div>
            {!prev &&
                <div>
                    <h1>Create User</h1>
                    <label htmlFor="Email"> Email</label>
                    <div div  onSubmit={handleSubmit}>
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
                            value={PIN}
                            onChange={(e) => setPIN(e.target.value)}
                            placeholder="PIN"
                            required
                        />
                        <button   onClick={handleLogin}>Login</button>
                    </div >
                </div>}
            {prev &&
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
                                value={Repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                className={`password-input ${showPassword1 ? 'visible' : ''}`}
                            />
                            <input
                                type="checkbox"
                                id="showPassword1"
                                checked={showPassword1}
                                onChange={() => setShowPassword1(!showPassword1)}
                                className="show-password-checkboxa"
                            />
                       <OTP/>
                        </div>

                        <button className="btn btn-success" type="submit" onClick={handleSubmit}>Register</button>
                    </div>
                    <p>Already have an account? Sign in!</p>

                </div>

            }
            <button className="btn btn-danger" type="button" onClick={CreateUser}> {prev == false ? "Create User" : "Login"}</button>
            <p>{message}</p>
        </div>
    );
}

export default App;

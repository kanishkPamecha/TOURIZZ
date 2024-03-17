import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import HoelPage from './HotelPage';
import { useLocation, useNavigate } from 'react-router-dom';


function App() {
    const [email, setEmail] = useState('');
    const [Pin, setPin] = useState('');
    const [Password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [prev, setprev] = useState(false);
    const CreateUser = () => {
        setprev(prev => !prev);
    }

    const nav = useNavigate();

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



        axios.post('http://localhost:3001/hotel_admin_login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data.message === 'Success') {
                 nav('/Bookings_hotel');
                    setIsLoggedIn(true);

                }
            })
            .catch(err => console.log(err));
    };
    const handleLogout = () => {
        // Clear the login status cookie
        setIsLoggedIn(false);
    };


    const handleSubmit = () => {
        // if (password == Repassword) {
           
        axios.post('http://127.0.0.1:3001/create_hotel_admin', {
    name: name,
    mobileNumber: mobileNumber,
    email: email,
    password: password,
    Repassword: Repassword
})
    .then(response => {
        // Handle the success response here
        console.log('Response:', response.data);
        nav('/Hotel-Create_room');
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Response Error:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
    });

        // }
        // else
        //     alert("password inccorect");
    };





    return (
        <div>
            {!prev &&
                <div>
                    <h1>Create User</h1>
                    <label htmlFor="Email"> Email</label>
                    <div >
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
                        <button type="submit" onClick={handleLogin}>Login</button>
                    </div>
                </div>}
            {prev &&
                <div>

                    <h2>Register</h2>


                    <div >
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

// import React,{useState} from 'react'
// import axios from 'axios';
// function Login() {
//     const [email, setEmail] = useState('');
//     const [Pin, setPin] = useState('');
//     const [Password, setPassword] = useState('');
//     const [Token, setToken] = useState('');


//     const readwrite ='readwrite';
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/create_user', { email,readwrite });
//             setMessage('User created successfully');
//         } catch (error) {
//             console.error('An error occurred', error);
//             setMessage('An error occurred');
//         }
//     };

//     return (
//       <div>
//            <h1> Create a Admin of Hotel</h1>
           
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                  <input
//                     type="password"
//                     value={Password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="password"
//                     required
//                 />
//                  <input
//                     type="number"
//                     value={Pin}
//                     onChange={(e) => setPin(e.target.value)}
//                     placeholder="Pin"
//                     required
//                 />
//                      <input
//                     type="password"
//                     value={Token}
//                     onChange={(e) => setToken(e.target.value)}
//                     placeholder="Token Generated by the team Agents"
//                     required
//                 />
               
//                 <button type="submit">Create Admin</button>
//             </form>
//             <p>{message}</p>

//       </div>
//     )
// }

// export default Login

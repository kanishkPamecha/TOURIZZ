  import React,{useState} from 'react'
  
  function AdminF() {
    const [email, setEmail] = useState('');
    const [Pin, setPin] = useState('');
    const [Password, setPassword] = useState('');

    const readwrite ='readwrite';
    const [message, setMessage] = useState('');
const[selected , setselected] =useState(false);
    const handleSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     await axios.post('/create_user', { email,readwrite });
        //     setMessage('User created successfully');
        // } catch (error) {
        //     console.error('An error occurred', error);
        //     setMessage('An error occurred');
        // }
    };

    return (
      <div>
           <h1>Admin of Hotel</h1>
           <div>
            {selected && <div>
              </div>}
           </div>
           { !selected &&<div><form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                 <input
                    type="email"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
                 <input
                    type="PIN"
                    value={Pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Pin"
                    required
                />
                <button type="submit">Login as Admin</button>
            </form>
            </div> }
            
            <p>{message}</p>
            <button onClick={()=>setselected(true)}>Admin</button>
      </div>
    )
  }
  
  export default AdminF
  
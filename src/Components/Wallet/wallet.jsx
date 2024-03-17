import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Wallet = () => {
  const [balance, setBalance] = useState(0); // Initial wallet balance
 const [unfreezed,setunfreezed]=useState(0);
 const [loginId, setLoginId] = useState('');
 const [signin ,setsignin]=useState();
 const[password,setpassword] =useState(''); 
 const [showPassword, setShowPassword] = useState(false);
 const handleTogglePop = () => {
  setShowLoginPop(false);
  setShowPop(true);
};
const [showPop, setShowPop] = useState(false);
const [showLoginPop, setShowLoginPop] = useState(false);
  const handleTransferToBank = () => {let x= prompt('enter your pin')
  if (x==='123')
  {
    const amount = parseFloat(prompt('Enter the amount to transfer:'));
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
      // Perform backend action to initiate transfer to bank
      alert(`Transferred $${amount} to bank successfully.`);
    } else {
      alert('Invalid amount or insufficient balance.');
    }
  }else 
  {
    alert('it is not your password')
  }
}
const Req =()=>{
  const unfreezd1=prompt("ENter the amount ")
  if (!isNaN( unfreezd1) &&  unfreezd1 > 0 &&  unfreezd1 <= unfreezed) {
    setunfreezed(prevBalance => prevBalance - unfreezd1);
    // Perform backend action to initiate transfer to bank
    alert(`Transferred $${unfreezd1} to open  successfully.`);
    // setunfreezed(unfreezd1);
  } else {
    alert('Invalid amount or insufficient balance.');
  }
}
const automate =()=>{
  alert(' you are about to give permissions to automatically take money from your wallet');
  {let x= prompt('enter your pin')
  if (x==='123')
  {
    const amount = parseFloat(prompt('Enter the amount to transfer:'));
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
      // Perform backend action to initiate transfer to bank
      alert(`Transferred $${amount} to open  successfully.`);
      setunfreezed(prevBalance => prevBalance + amount);
    } else {
      alert('Invalid amount or insufficient balance.');
    }
  }else 
  {
    alert('it is not your password')
  }
}
}
 const fetchbalance =()=>{
  let x= prompt('enter your pin')
  if (x==='123')
  {
   setBalance(balance);
  }
  else{
    alert('enter the correct password');
  }
 }
 const fetchBalance = async () => {
  try {
    const response = await axios.get(`/api/getBalance/${loginId}`);
    setBalance(response.data.balance);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};

const handleFetchBalanceClick = () => {
  const inputLoginId = prompt('Enter your login ID:');
  if (inputLoginId) {
    setLoginId(inputLoginId);
    fetchBalance();
  }
};


  const handleTransferToWallet = () => {
    let x= prompt('enter your pin')
    if (x==='123')
    {

      const amount = parseFloat(prompt('Enter the amount to transfer:'));
      if (!isNaN(amount) && amount > 0) {
        setBalance(prevBalance => prevBalance + amount);
        // Perform backend action to initiate transfer to wallet
        alert(`Transferred $${amount} to wallet successfully.`);
      } else {
        alert('Invalid amount.');
      }
    } 
    else 
    {
      alert('it is not your password')
    }
  }
  const handlelog = (e) => {
    if(password === '123') {
      setsignin(true);
    } else {
      alert('sahi dall');
    }
  }
  return (
    <div>
      {signin&&<div>
      <h2>Wallet Management</h2>
      <button onClick={handleFetchBalanceClick}>Fetch Balance from Account</button>
      <p>Current Balance: ${balance}
      {unfreezed !== 0 && <span>+{unfreezed}</span>}
</p>
      <button onClick={handleTransferToBank}>Transfer to Bank</button>
      <button onClick={handleTransferToWallet}>Transfer to Wallet</button>
      <button onClick={automate}>Fast Transfer</button>
      <button onClick={Req}>Req</button>
  </div>}
     {!signin && 
  
       <div className='Container5'>
    <h2>Wallet</h2>
    <button type="button" className="btn-close" aria-label="Close" ></button>

 Your Wallet is protected 

    <div className="password-input">
      <label htmlFor="password">Password:</label>
      <input
        type={showPassword ? 'text' : 'password'}
        id="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        className={showPassword ? 'visible' : ''}
      />
      <input
        type="checkbox"
        id="showPassword"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
        className="show-password-checkbox"
      />
    </div>

    <div className="button-group">
      <button type="submit" onClick={handlelog} >Login</button>
      <button >Sign in</button>
    </div>
  </div>
     }
    </div>

  );

};

export default Wallet;

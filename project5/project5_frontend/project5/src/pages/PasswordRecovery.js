import React, { useState } from 'react';

import MainPage from '../components/MainPage';
import {recoveryPAssword} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';
import {useNavigate} from 'react-router-dom';

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await recoveryPAssword(email);

    if(result===true){
      NotificationManager.success("Email sent successfully, check your inbox");
      navigate("/login");
    }else{
      NotificationManager.error("Invalid email", "", 1000);
    }

  };

  return (
    <div>
         <MainPage/>
    <div className="verify-container">
       
      <h2>Password Recovery</h2>
      <p> Enter your email:</p>
  
        <input
        
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className= "btn_confirm" onClick={handleSubmit}>Recover Password</button>
   
       
      </div>
    </div>
  );
}

export default PasswordRecovery;
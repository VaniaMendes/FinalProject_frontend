import React from 'react';
import MainPage from '../components/MainPage';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {validateAccount} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';



function EmailConfirmation(){

    const location = useLocation(); // Use o hook useLocation para obter a URL atual
    const queryParams = queryString.parse(location.search);
    const [tokenConfirmation, setTokenConfirmation] = useState(null);
    const navigate = useNavigate();
  

    useEffect(() => {
        const token = queryParams.token; 
        setTokenConfirmation(token); 
    }, [location.search]);

const handleConfirmation = async () =>{
    if(tokenConfirmation){
        const result = await validateAccount(tokenConfirmation);
        if(result===true){
            NotificationManager.success("Email confirmed successfully", "", 1000);
            navigate('/login');
           
        }else{
            NotificationManager.error("Failed to confirm email", "", 1000);
        }

    }
}
 
   return( 

        <div>
        <MainPage/>
        <div className="verify-container">
             <h2>Email Verification</h2>
            <p>Please click the button below to confirm your email:</p>
            <button className="btn_confirm" onClick={handleConfirmation}>Confirm Email</button>
        </div>
        </div>

    )
}

export default EmailConfirmation;
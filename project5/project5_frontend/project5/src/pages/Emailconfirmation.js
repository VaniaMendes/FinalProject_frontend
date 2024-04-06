import React from 'react';
import MainPage from '../components/MainPage';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {getUsersByTokenConfirmation, validateAccount} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';


function EmailConfirmation(){

    const location = useLocation(); // Use o hook useLocation para obter a URL atual
    const queryParams = queryString.parse(location.search);
    const [tokenConfirmation, setTokenConfirmation] = useState(null);
    const navigate = useNavigate();

    const[email, setEmail] = useState("");
  
    useEffect(() => {
        const fetchUser = async () => {
        const token = queryParams.token; 
        setTokenConfirmation(token); 
        const user = await getUsersByTokenConfirmation(token);
        setEmail(user.email);
        console.log(user.email);
        
        };
        fetchUser();
        
    }, [location.search]);


const handleConfirmation = async () =>{
    if(tokenConfirmation){
        const result = await validateAccount(tokenConfirmation);
        
        if(result===true){
            console.log(email);
            NotificationManager.success("Email confirmed successfully", "", 1000);
            navigate('/newPassword?email='+ email);
           
        }else{
            NotificationManager.error("Failed to confirm email", "", 1000);
        }

    }
}
 
   return( 

        <div>
        <MainPage/>
        <div className="password-container">
             <h2>Email Verification</h2>
            <p>Please click the button below to confirm your email:</p>
            <button className="btn_confirm" onClick={handleConfirmation}>Confirm Email</button>
        </div>
        </div>

    )
}

export default EmailConfirmation;
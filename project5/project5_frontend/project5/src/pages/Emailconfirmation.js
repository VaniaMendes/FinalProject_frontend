import React from 'react';
import MainPage from '../components/MainPage';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {getUsersByTokenConfirmation, validateAccount} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import {userStore} from '../stores/UserStore';
import Language from '../components/language';


function EmailConfirmation(){

    const location = useLocation(); // Use o hook useLocation para obter a URL atual
    const queryParams = queryString.parse(location.search);
    const [tokenConfirmation, setTokenConfirmation] = useState(null);
    const navigate = useNavigate();

       //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

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
        
    }, [location.search, queryParams.token]);


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
            <div className="location1">  <Language/> </div>
            <IntlProvider locale={locale} messages={languages[locale]}>
       
        <div className="password-container">
             <h2><FormattedMessage id="emailVerification">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></h2>
            <p>
            <FormattedMessage id="pleaseConfirm">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
            <button className="btn_confirm" onClick={handleConfirmation}> <FormattedMessage id="confirmEmail">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
        </div>
        </IntlProvider>
        </div>

    )
}

export default EmailConfirmation;
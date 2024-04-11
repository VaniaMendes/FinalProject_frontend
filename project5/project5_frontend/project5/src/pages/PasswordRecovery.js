import React, { useState } from 'react';

import MainPage from '../components/MainPage';
import {recoveryPAssword} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';
import {useNavigate} from 'react-router-dom';
import { IntlProvider, FormattedMessage } from "react-intl";
import languages from "../translations";
import {userStore} from "../stores/UserStore";
import Language from '../components/language';

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);

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
         <div className="location1">  <Language/> </div>
         <IntlProvider locale={locale} messages={languages[locale]}> 
    <div className="password-container">
       
      <h2><FormattedMessage id="passwordRecovery">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></h2>
      <p> <FormattedMessage id="enterYourEmail">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
  
                      <FormattedMessage id="enterYourEmail">
                        {(message) =>
        <input
        
          type="email"
          placeholder={message}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
                        }</FormattedMessage>
        <button className= "btn_confirm" onClick={handleSubmit}><FormattedMessage id="recoverPassword">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
   
       
      </div>
      </IntlProvider>
    </div>
  );
}

export default PasswordRecovery;
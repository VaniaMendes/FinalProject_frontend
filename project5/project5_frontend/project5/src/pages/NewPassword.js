import React from 'react';
import MainPage from '../components/MainPage';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {useState, useEffect} from 'react';
import {changePassword} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';
import { IntlProvider, FormattedMessage } from "react-intl";
import languages from "../translations";
import {userStore} from '../stores/UserStore';
import Language from '../components/language';


function NewPassword(){

    const location = useLocation(); // Use o hook useLocation para obter a URL atual
    const queryParams = queryString.parse(location.search);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

      //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);


    const[password1, setPassword1] = useState(null);
    const[password2, setPassword2] = useState(null);
  

    useEffect(() => {
        const email1 = queryParams.email; 
        setEmail(email1); 
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se as passwords são iguais
    if (password1 !== password2) {
        NotificationManager.error("Passwords don't match", "", 1000);
        return;
    }
        const result = await changePassword(email, password1, password2);
        if(result===true){
            NotificationManager.success("Password changed successfully", "", 1000);
            navigate("/login");
            
        }else{
            NotificationManager.error(result, "", 1000);
        }
    };


    return(
        <div>
            <MainPage />
            <div className="location1">  <Language/> </div>
            <IntlProvider locale={locale} messages={languages[locale]}> 
            <form onSubmit={handleSubmit}>
                <label><FormattedMessage id="newPassword">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>

                      <FormattedMessage id="newPassword">
                        {(message) =>
                <input
                    type="password"
                    placeholder={message}
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                        }</FormattedMessage>
                <label><FormattedMessage id="confirmNewPassword">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>

                      <FormattedMessage id="confirmNewPassword">
                        {(message) =>
                <input
                    type="password"
                    placeholder={message}
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                        }</FormattedMessage>
                <button type="submit"><FormattedMessage id="submit">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
            </form>
            </IntlProvider>
        </div>


    )
}

export default NewPassword;


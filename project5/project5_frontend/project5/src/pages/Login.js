
import { useState } from 'react';
import MainPage from '../components/MainPage';
import { userStore } from '../stores/UserStore'; 
import { FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import {  NotificationManager } from "react-notifications";
import '../format/login.css';
import { useNavigate  } from 'react-router-dom';
import { showModal } from '../stores/boardStore';
import { IntlProvider, FormattedMessage } from "react-intl";
import languages from "../translations";
import Language from '../components/language';


function Login(){

    //Define o estado para o username e password do tutilizador
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');

     const navigate = useNavigate ();

    //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

    
  //Estados para controlar a exibição do modal de newUser
  const setShowNewUserModal = showModal(state => state.setShowNewUserModal);


  //Funcao para registar novo utilizador
  const handleNewUSer = ()=> {
    setShowNewUserModal(true);
   
  };
  

//Função para lidar com o envio do formulario de login
    const handleSubmit = async (event) => {
        event.preventDefault(); 
         // Objeto com os dados de login do usuário
        const user = { username: username, password: password };

        
            try {
            const response = await fetch( "http://localhost:8080/project_backend/rest/users/login", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            //Verifica se o login foi bem sucedido
            if (response.ok) {
               const token = await response.json();
               userStore.getState().setToken(token);
              
               
                NotificationManager.success("Welcome to AgileUp");
                setTimeout(() => {
                    navigate("/principalPage");
                  }, 800);
                

            } else {
                NotificationManager.warning("Wrong username or password", "" , 800);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div className="pageLogin" id="page_login">
          
             <MainPage/>
             <div className="location1">  <Language/> </div>
            
            
           <IntlProvider locale={locale} messages={languages[locale]}> 
        
           
            <div className="main" id="login_main">
                <form id="login_form" onSubmit={handleSubmit}>
                    <h2 className="signin-header"> <FaUserCircle className='imgLogin'/><FormattedMessage id="signIn">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> </h2>
                    
                    <div id="login_inputs">
                        <label className="descriptioLabel"><FaUser/><FormattedMessage id="username">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> </label>
                      <FormattedMessage id="username">
                        {(message) => 
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder={message}
                            autoComplete="off"
                            className="login_inputs"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />

                        }</FormattedMessage>
                        <div className="form_group">
                            <label className="descriptioLabel"><RiLockPasswordFill/><FormattedMessage id="password">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
                      <FormattedMessage id="password">
                        {(message) =>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder={message}
                                className="login_inputs"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        }</FormattedMessage>
                             <a className="signUp" href="/passwordRecovery" onClick={handleNewUSer}><FormattedMessage id="Forgot Your Password?">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></a>
                        </div>
                    </div>
                    <div className="form_group">
                        <button type="submit" id="btn_login"><FormattedMessage id="login">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button> 
                    </div>
                </form>
            </div>
            </IntlProvider>
        </div>
    )
}

export default Login;

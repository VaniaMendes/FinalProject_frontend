import React, { useEffect } from "react";
import { useState } from "react";
import {userStore} from '../stores/UserStore';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { useNavigate  } from 'react-router-dom';
import { getUserByToken } from "../endpoints/users";
import ButtonsForProfile from "./buttonsForProfile";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function EditProfile(){

    // Obtém o token do user
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;

    
  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);


    // Obtém a função para obter o papel do user
    const {  getRole } = userStore();
    const role = getRole();
    // Estado para armazenar informações do user que fez o login
    const [userLogged, setUserLogged] = useState(null);


    // Hook para navegar entre rotas
    const navigate = useNavigate();
    
    // Efeito para obter informações do user 
    useEffect(() => {
        const fetchData = async()=> {
            const result = await getUserByToken(tokenUser)
            setUserLogged(result); //Define as informações do user
 
         };
         fetchData();
        }, [tokenUser]);

        // Estado para armazenar as informações editadas pelo user
        const [userEdit, setUserEdit] = useState({
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
            imgURL: ''
        });

        // Estado para rastrear os campos alterados pelo user
        const [changedFields, setChangedFields] = useState({});

         // Função para lidar com a alteração nos campos de edição de perfil
         const handleInputChange = (e) => {
            const { id, value } = e.target;
            setUserEdit(prevState => ({
                ...prevState,
                [id]: value
            }));

           // Define que o campo foi alterado
            setChangedFields(prevState => ({
                ...prevState,
                [id]: true
            }));
        };

        // Função para lidar com o envio do formulário de edição do perfil
        const handleSubmit = async (e) => {
            e.preventDefault(); // Previne o comportamento padrão do formulário
            
            try {
                // Cria um objeto com os campos alterados pelo user
                const updatedUserData = Object.keys(changedFields).reduce((acc, key) => {
                    acc[key] = userEdit[key];
                    return acc;
                }, {});
                // Envia uma requisição PUT para atualizar o perfil do user
                const response = await fetch("http://localhost:8080/project_backend/rest/users/updateProfile", {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*',
                        token: tokenUser
                    },
                    body: JSON.stringify(updatedUserData),
                   
                });

            
                if (response.ok) {
                    NotificationManager.success("Your valid changes have been saved","", 800);
                    setTimeout(() => {
                        navigate("/principalPage");
                      }, 1000);
                  
                } else if (response.status === 401) {
                   navigate("/login"); 
                } else if (response.status === 422) {
                    const responseData = await response.text();
                    NotificationManager.warning(responseData,"", 800);
                } else {
                    NotificationManager.error("Something went wrong","", 800,);
                }
            } catch (error) {
                console.error("Error:", error);
                NotificationManager.error("Something went wrong", "", 800);
            }
        };

        // Função para lidar com o botão de voltar
        const handleBack = () => {
           navigate('/principalPage');
        };

            
    return(
       <div> 
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="edit_container1">
        <div className="edit_photo">
           <img src={userLogged?.imgURL} id="user_photo" alt="Descrição da imagem" />
           <p id="username_edit">{userLogged?.username}</p>
           <div className="buttonsProfile"><ButtonsForProfile/></div>
        </div>
        <div className="edit_profile">
            
           <div>
              <label  className="descriptioLabel"> <FormattedMessage id="password">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="password" placeholder="******"/>
           </div>
           <div>
              <label className="descriptioLabel"><FormattedMessage id="email">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              
              <input type="text" className="edit_element" id="email" placeholder={userLogged?.email} onChange={handleInputChange} />
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="firstName">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="firstName" placeholder={userLogged?.firstName} onChange={handleInputChange} />
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="lastName">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="lastName" placeholder={userLogged?.lastName} onChange={handleInputChange}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="phoneNumber">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="phoneNumber" placeholder={userLogged?.phoneNumber} onChange={handleInputChange}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="urlImage">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="imgURL" placeholder={userLogged?.imgURL} onChange={handleInputChange}/>
           </div>

        </div>
        <div className="confirm_profile">
           <button className="btn_save" id="btn-save" onClick={handleSubmit}><FormattedMessage id="save">
                {(message) => <span>{message}</span>}
              </FormattedMessage></button>
           <button className="btn_cancel" id="btn_cancel" onClick={handleBack}><FormattedMessage id="back">
                {(message) => <span>{message}</span>}
              </FormattedMessage></button>
        </div>
     </div>
     </IntlProvider>
     </div> 

    )
}

export default EditProfile;
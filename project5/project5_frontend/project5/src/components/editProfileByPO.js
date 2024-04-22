import React, { useEffect } from "react";
import { useState } from "react";
import {userStore} from '../stores/UserStore';
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import {  getUserByUsername} from "../endpoints/users";
import { updateProfileByPO } from "../endpoints/users";
import { updateUsersTable, showMessages} from '../stores/boardStore';
import {useNavigate} from 'react-router-dom';
import ButtonsForProfile from "./buttonsForProfile";
import { useParams } from "react-router-dom";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function EditProfileByPO(){


   const navigate = useNavigate();
   //Obtem o token da store
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;

      //Obtem a linguagem de exibição da página
    const locale = userStore((state) => state.locale);

    //Obtem o tipo de utilizador da store
    const {  getRole } = userStore();
    const role = getRole();    

    //Obtemo username guardado da store do user ao qual vamos alterar o perfil
   
    const { username } = useParams();
   

    //Estado para aramzenar as informações do user a ser editado
    const [userEditPO, setUserEditPO] = useState(null);

        //Estado para mostrar o comoponente do chat
        const { showMessageChat, setShowMessageChat } = showMessages();

    
    //Estado para aramzenar as alteraçóes feitas nos campos de edição
    const [userEdit, setUserEdit] = useState(null);

    //Estado para controlar a visibilidade da tabela de utilizadores
    const {showUsersTable, setShowUsersTable} = updateUsersTable();


    //Efeito para ir buscar os dados do user a ser editado
    useEffect(() => {
        const fetchData = async()=> {
            const result = await getUserByUsername(tokenUser, username);
            setUserEditPO(result); //Define as informações do user
         };
         fetchData();
        }, [tokenUser, username]);

        

        //Função para lidar com as alterações nos campos de entrada
        const [changedFields, setChangedFields] = useState({});

         //Deteta as alteracoes nso campos de editProfile
         const handleInputChange = (e) => {
            const { id, value } = e.target;

            // Atualiza o estado do usuário a ser editado
            setUserEditPO(prevState => ({
               ...prevState,
               [id]: value
           }));
           // Atualiza o estado das alterações
            setUserEdit(prevState => ({
                ...prevState,
                [id]: value
            }));

            setChangedFields(prevState => ({
                ...prevState,
                [id]: true
            }));
        };

        // Função para lidar com o envio dos dados editados
        const handleSubmit = async (e) => {
       
       // Cria um novo objeto de usuário só com os campos editados
         const newUser = Object.keys(changedFields).reduce((acc, key) => {
            acc[key] = userEdit[key];
            return acc;
        }, {});
            const result = await updateProfileByPO(tokenUser,username,newUser);
            if(result === 200){
                NotificationManager.success("User edited successfully", "", 1000);

              navigate("/activeUsers");
               setShowUsersTable(!showUsersTable);
            }else{
                NotificationManager.warning(result, "", 1000);

            }
        };

        //Função para voltar quando clicamos no botao BACK - coloca a visibilidade do modal a false
        const handleBack = ()=>{
         navigate("/activeUsers");
      
        }


    return(
    
       <div>
         
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div className={`edit_container1 ${showMessageChat ? 'edit-container-moved' : 'edit_container1'}`}>
        <div className="edit_photo">
           <img src={userEditPO?.imgURL} id="user_photo" alt="User photo" />
           <p id="username_edit">{userEditPO?.username}</p>
           <ButtonsForProfile/>
        </div>
        <div className="edit_profile">
           
           <div>
              <label className="descriptioLabel"><FormattedMessage id="email">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="email" placeholder={userEditPO?.email} onChange={handleInputChange} disabled={role === "scrum_master"}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="firstName">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="firstName" placeholder={userEditPO?.firstName} onChange={handleInputChange} disabled={role === "scrum_master"}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="lastName">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="lastName" placeholder={userEditPO?.lastName} onChange={handleInputChange} disabled={role === "scrum_master"}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="phoneNumber">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="phoneNumber" placeholder={userEditPO?.phoneNumber} onChange={handleInputChange} disabled={role === "scrum_master"}/>
           </div>
           <div>
              <label  className="descriptioLabel"><FormattedMessage id="urlImage">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
              <input type="text" className="edit_element" id="imgURL" placeholder={userEditPO?.imgURL} onChange={handleInputChange} disabled={role === "scrum_master"}/>
           </div>
           <div>
                <label className="descriptioLabel" ><FormattedMessage id="UserRole">
                {(message) => <span>{message}</span>}
              </FormattedMessage></label>
                {role !== "product_owner" && (
        <input
            type="text"
            value={userEditPO?.typeOfUser}
            readOnly
            disabled={role === "scrum_master"}
        />
    )}

{role === "product_owner" && (
                <select id="typeOfUser" name="opcoes" value={userEditPO?.typeOfUser}   onChange={handleInputChange} disabled={role === "scrum_master"}> 
                <option value="developer">Developer</option>
                <option value="scrum_master">Scrum Master</option>
                <option value="product_owner">Product Owner</option>
                </select>
)}
            </div>

        </div>
        <div className="confirm_profile">
           <button className="btn_save" id="btn-save" onClick={handleSubmit} hidden={role === "scrum_master"}><FormattedMessage id="save">
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

export default EditProfileByPO;

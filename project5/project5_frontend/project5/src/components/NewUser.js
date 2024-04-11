import React, { useState } from "react";
import { registerUserByPO, registerUser } from "../endpoints/users";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import "../format/register.css";
import {NotificationManager } from "react-notifications";
import { showModal, updateUsersTable } from "../stores/boardStore";
import {useNavigate} from "react-router-dom";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function NewUser() {

  //Obtem o token do user da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  const navigate = useNavigate();

       //Obtem a linguagem de exibição da página
       const locale = userStore((state) => state.locale);

  //Obtem o tipo de utilizador da store
  const {  getRole } = userStore();
  const role = getRole();
  
    
  //Estados para controlar a exibição do modal de newUser
  const showNewUserModal = showModal((state) => state.showNewUserModal); 
  const setShowNewUserModal = showModal((state) => state.setShowNewUserModal); 


  //Estados para armazenar os dados do novo utilizador
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [typeOfUser, setTypeOfUser] = useState("");

  //Obtem o estado para exibir a tabela de utilizadores
  const {showUsersTable, setShowUsersTable} = updateUsersTable();

  //Função para fechar o modal
  const closeModal = () => {
    setShowNewUserModal(false);
    navigate("/productOwner");
    if(role !== "product_owner"){
      navigate("/login");
    }
  
  };


  //Objeto com os dados do novo utilizador
  const newUser = {
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    imgURL: imgURL,
    typeOfUser: role === "product_owner" ? typeOfUser : "developer"
  };

  //Função para lidar com o envio dos dados do novo utilizador
  const handleSubmit = async (event) => {
    event.preventDefault(); 

     // Validação dos campos
  if (!username  || !email || !firstName || !lastName || !phoneNumber || !imgURL || (role === "product_owner" && !typeOfUser)) {
    NotificationManager.warning("Please fill in all fields", "", 800);
    return;
  }

  // Verificar se o email é válido
  if (!isValidEmail(email)) {
    NotificationManager.warning("Please enter a valid email address", "", 800);
    return;
  }

  // Verificar se o número de telefone é válido
  if (!isValidPhoneNumber(phoneNumber)) {
    NotificationManager.warning("Please enter a valid phone number", "", 800);
    return;
  }
  

  if(role==="product_owner"){
    const result = await registerUserByPO(tokenUser, newUser);
    if(result===200){
      NotificationManager.success("New User successfully created", "", 800);
      setShowNewUserModal(false);
      setShowUsersTable(true);
      navigate("/productOwner");
    }else{
      NotificationManager.warning(result, "", 800);
    }
   
  }else{
  //Logica para registo de um utilizador inicial

  const result = await registerUser(newUser);
  if(result===true){
  NotificationManager.success("Please verify your email account", "", 800);
  navigate("/login");
  
}else{
  NotificationManager.warning(result, "", 800);
}
}
  }

  const isValidEmail = (email) => {
    // Expressão regular para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPhoneNumber = (phoneNumber) => {
    // Expressão regular para validar o formato do número de telefone
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
<IntlProvider locale={locale} messages={languages[locale]}>
    
        <div className="modal_container">  
      {showNewUserModal && (
        <div className='form_register'>
        <form className="registerPO" id="form_register">
          <h2 className="register-header">
            <FaUserCircle className="imgLogin" />
            <FormattedMessage id="accountCreation">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
          </h2>
          <label htmlFor="register_username" className="descriptioLabel">
          <FormattedMessage id="username">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}
                      <FormattedMessage id="enterYourUsername">
      {(message) => 
            <input
              type="text"
              placeholder={message}
              className="register_elem"
              id="register_username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
      }</FormattedMessage>
          </label>
         
          <label htmlFor="register_email" className="email">
          <FormattedMessage id="username">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}

                   
                      <FormattedMessage id="enterYourEmail">
      {(message) => 
            <input
              type="text"
              placeholder={message}
              className="register_elem"
              id="register_email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
}</FormattedMessage>
          </label>

          <label htmlFor="register_firstName" className="descriptioLabel">
          <FormattedMessage id="firstName">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}
                      <FormattedMessage id="enterYourFirstName">
      {(message) => 
            <input
              type="text"
              placeholder={message}
              className="register_elem"
              id="register_firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
      }</FormattedMessage>
          </label>

          <label htmlFor="register_lastName" className="descriptioLabel">
          <FormattedMessage id="lastName">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}

                      <FormattedMessage id="enterYourLastName">
      {(message) =>      
            <input
              type="text"
              placeholder={message}
              className="register_elem"
              id="register_lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
            }</FormattedMessage>
          </label>

          <label htmlFor="register_phone" className="descriptioLabel">
          <FormattedMessage id="phoneNumber">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}
                      <FormattedMessage id="enterYourPhoneNumber">
      {(message) =>   
            <input
              type="text"
              placeholder={message}
              className="register_elem"
              id="register_phone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
            }</FormattedMessage>
          </label>

          <label htmlFor="register_photo_amin" className="descriptioLabel">
          <FormattedMessage id="urlImage">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>{" "}
                      <FormattedMessage id="EnterURofyourimage">
      {(message) =>   
            <input
              type="url"
              placeholder={message}
              className="register_elem"
              id="register_photo_main"
              value={imgURL}
              onChange={(event) => setImageURL(event.target.value)}
              required
            />
            }</FormattedMessage>
          </label>

          {/* Se o user logado for product owner pode escolher o role do user que está a registar, caso contrário é
          registado como developer*/}
  {role=== "product_owner" && (
          <label htmlFor="register_photo_amin" className="descriptioLabel">
             <FormattedMessage id="role">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            <select
              id="register_typeOfUser"
              name="opcoes"
              defaultValue={typeOfUser}
              onChange={(event) => setTypeOfUser(event.target.value)}
            >
              <option value="" ><FormattedMessage id="selectArole">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></option>
              <option value="developer">Developer</option>
              <option value="scrum_master">Scrum Master</option>
              <option value="product_owner">Product Owner</option>
            </select>
          </label>
          )}

          <div className="button-container">
            <button
              className="register_elem"
              id="registerPO_submit"
              onClick={handleSubmit}
            >
              <FormattedMessage id="save">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </button>
            <button
              className="register_elem"
              id="registerPO_submit"
              onClick={closeModal}
            >
             <FormattedMessage id="cancel">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </button>
          </div>
        </form>
        </div>
  
      )}
      ;
    </div>
    </IntlProvider>
  );
  }

export default NewUser;

import React, { useState } from "react";
import { registerUserByPO, registerUser } from "../endpoints/users";
import { FaUserCircle } from "react-icons/fa";
import { userStore } from "../stores/UserStore";
import "../format/register.css";
import {NotificationManager } from "react-notifications";
import { showModal, updateUsersTable } from "../stores/boardStore";
import {useNavigate} from "react-router-dom";


function NewUser() {


  //Obtem o token do user da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  const navigate = useNavigate();

  //Obtem o tipo de utilizador da store
  const {  getRole } = userStore();
  const role = getRole();
  
  
  
  //Estados para controlar a exibição do modal de newUser
  const showNewUserModal = showModal((state) => state.showNewUserModal); 
  const setShowNewUserModal = showModal((state) => state.setShowNewUserModal); 


  //Estados para armazenar os dados do novo utilizador
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    password: password,
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
  if (!username || !password || !email || !firstName || !lastName || !phoneNumber || !imgURL || (role === "product_owner" && !typeOfUser)) {
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
      setShowUsersTable(!showUsersTable);
      closeModal();
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

    
        <div className="modal_container">  
      {showNewUserModal && (
        <div className='form_register'>
        <form className="registerPO" id="form_register">
          <h2 className="register-header">
            <FaUserCircle className="imgLogin" />
            Account Creation
          </h2>
          <label htmlFor="register_username" className="descriptioLabel">
            Username{" "}
            <input
              type="text"
              placeholder="Enter your username"
              className="register_elem"
              id="register_username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_password" className="descriptioLabel">
            Password{" "}
            <input
              type="text"
              placeholder="Enter your password"
              className="register_elem"
              id="register_password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_email" className="descriptioLabel">
            Email{" "}
            <input
              type="text"
              placeholder="Enter your email"
              className="register_elem"
              id="register_email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_firstName" className="descriptioLabel">
            First Name{" "}
            <input
              type="text"
              placeholder="Enter your first name"
              className="register_elem"
              id="register_firstName"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_lastName" className="descriptioLabel">
            Last Name{" "}
            <input
              type="text"
              placeholder="Enter your last name"
              className="register_elem"
              id="register_lastName"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_phone" className="descriptioLabel">
            Phone Number{" "}
            <input
              type="text"
              placeholder="Enter your phone number"
              className="register_elem"
              id="register_phone"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </label>

          <label htmlFor="register_photo_amin" className="descriptioLabel">
            URL Image{" "}
            <input
              type="url"
              placeholder="Enter the URL of your image"
              className="register_elem"
              id="register_photo_main"
              value={imgURL}
              onChange={(event) => setImageURL(event.target.value)}
              required
            />
          </label>

          {/* Se o user logado for product owner pode escolher o role do user que está a registar, caso contrário é
          registado como developer*/}
  {role=== "product_owner" && (
          <label htmlFor="register_photo_amin" className="descriptioLabel">
            Role
            <select
              id="register_typeOfUser"
              name="opcoes"
              defaultValue={typeOfUser}
              onChange={(event) => setTypeOfUser(event.target.value)}
            >
              <option value="" >Select a role</option>
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
              Save
            </button>
            <button
              className="register_elem"
              id="registerPO_submit"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
        </div>
  
      )}
      ;
    </div>
  );
  }

export default NewUser;

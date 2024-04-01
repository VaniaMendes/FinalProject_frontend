import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { HiHome } from "react-icons/hi2";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { logout } from "../endpoints/users";
import { getUserByToken } from "../endpoints/users";
import { useNavigate  } from 'react-router-dom';
import { MdTask } from "react-icons/md";
import { myTasks} from '../endpoints/tasks';
import {showMyTasks, showModal, cleanBoardStore} from '../stores/boardStore';



function SideMenu() {

  //Obtem o tipo de utilizador da store
  const { setRole } = userStore();

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Obtem o estado de ativação do filtro
  const { setFilterOn} = showModal();

  //Estado para guardar os dados do utilizador
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  //Obtem  o estado de exibição das tarefas apenas do utilizador
 const {setShowUserTasks} = showMyTasks();

 
// Efeito para buscar os dados do usuário ao montar o componente
useEffect(() => {
  async function fetchData() {
    try {
      const user = await getUserByToken(tokenUser);
      setUserData(user);
      setRole(user.typeOfUser);
     
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }
  fetchData();
}, [tokenUser]);

//Função para navegar para a página de edição de perfil
 const handleClick = () => {
    navigate("/editProfile");
    setFilterOn(false);
    setShowUserTasks(false);
  };

  //Função para navegar para a página principal
  const homeclick = () => {
    setShowUserTasks(false);
    setFilterOn(false);
    navigate( "/principalPage");
  };


  //Função para consultar apenas as tarefas do próprio utilizador
  const handleMyTaks = async(tokenUser) => {
    navigate("/principalPage");

    //Vai buscar as tasks do user que está logado
  const result = await myTasks(tokenUser);

  if(result !== null){
    userStore.getState().setMyTasks(result);//Guarda a lista de tasks na store
    setShowUserTasks(true);//Ativa o estado de exibição das próprias tarefas
  
  }else{
    NotificationManager.warning("No tasks found", "", 800);
  }
    
  };


  //Função para efetuar o logout
  const logoutClick = async (event) => {
    event.preventDefault();
    try{
    const result = await logout(tokenUser);

    if (result === true) {
    
      NotificationManager.success("Logout successfully");
       // Limpa a store e o boardStore antes de redirecionar para a página de login
       userStore.getState().clearStore();
       cleanBoardStore();
       navigate('/login');
    
    } else {
      console.log("Erro ao buscar dados do usuário:", result.error);
    }
  }catch(error){
    console.log("Erro durante logout", error);
  }
  };




  return (
    <div>
           <div id="side_menu">
        <div id="menu">
          <div className="menu_image" id="user_name">
            <div id="user_info">
            <img id="user_img" src={userData && userData.imgURL} alt="User logo" />
              <span className="welcome">{userData && userData.firstName}</span>
            </div>
            <div className = "menuSide">
            <div className='menuPO'>
            <ul className="menu_list">
              <li className="item_PO" onClick={homeclick}>
                <HiHome /> Home
              </li>
              <li className="item_PO" onClick={logoutClick}>
                <RiLogoutCircleFill /> Logout
              </li>
              <li className="item_PO" onClick={handleClick}>
                <RiEdit2Fill /> My Profile
              </li>
              <li className="item_PO" onClick={() =>handleMyTaks(tokenUser)}>
                <MdTask /> My Tasks
              </li>
            </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;

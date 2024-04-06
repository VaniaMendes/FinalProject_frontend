
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfileByPO from "../components/editProfileByPO";
import React from "react";
import MenuProductOwner from "../components/MenuProductOwner";
import {useNavigate} from 'react-router-dom';
import {userStore} from '../stores/UserStore'

function UserProfile(){

    const navigate = useNavigate();
  
    //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  if (!tokenUser) {
    navigate("/login"); // Redireciona para a página de login se não estiver autenticado
    return null; // Retorna null para evitar renderização da página
  }
            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfileByPO/>
        <MenuProductOwner/>
        
        </div>
             
    )
}

export default UserProfile;
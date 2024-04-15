
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfile from "../components/edit_profile";
import React from "react";
import {userStore} from '../stores/UserStore';
import MenuScrum from "../components/MenuScrum";
import MenuProductOwner from "../components/MenuProductOwner";
import {useNavigate} from 'react-router-dom';



function EditProfilePage(){

       //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
    const { getRole } = userStore();

    const navigate = useNavigate();
    const role = getRole();
    if (!tokenUser) {
        navigate("/authentication"); // Redireciona para a página de login se não estiver autenticado
        return null; // Retorna null para evitar renderização da página
      }
            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfile/>
        {role === "scrum_master" || role === "developer" ? <MenuScrum /> : <MenuProductOwner />}s
       
        </div>
             
    )
}

export default EditProfilePage;
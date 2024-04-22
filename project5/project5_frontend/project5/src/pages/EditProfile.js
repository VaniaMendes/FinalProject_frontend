
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfile from "../components/edit_profile";
import React from "react";
import {userStore} from '../stores/UserStore';
import MenuScrum from "../components/MenuScrum";
import MenuProductOwner from "../components/MenuProductOwner";
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";



function EditProfilePage(){

  const tokenUser = localStorage.getItem("tokenUser");
    const { getRole } = userStore();

    const navigate = useNavigate();
    const role = getRole();


  
            
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
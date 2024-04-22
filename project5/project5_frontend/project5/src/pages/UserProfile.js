
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfileByPO from "../components/editProfileByPO";
import React from "react";
import MenuProductOwner from "../components/MenuProductOwner";
import {useNavigate} from 'react-router-dom';
import {userStore} from '../stores/UserStore';
import MenuScrum from "../components/MenuScrum";
import { useEffect } from "react";

function UserProfile(){

    const navigate = useNavigate();

    const { getRole } = userStore();
  const role = getRole();
  const tokenUser = userStore((state) => state.token.token);

            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfileByPO/>
        {role === "scrum_master" || role === "developer" ? <MenuScrum /> : <MenuProductOwner />}
        
        </div>
             
    )
}

export default UserProfile;
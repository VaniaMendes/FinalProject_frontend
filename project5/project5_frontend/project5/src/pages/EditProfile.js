
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfile from "../components/edit_profile";
import React from "react";
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom';




function EditProfilePage(){

    const { getRole } = userStore();

    const navigate = useNavigate();
    const role = getRole();


  if(role===null){
    navigate('/authentication');
  
  }
            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfile/>
              
        </div>
             
    )
}

export default EditProfilePage;

import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfile from "../components/edit_profile";
import React from "react";
import TotalTasks from "../components/TotalTasks";


function EditProfilePage(){

 
            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfile/>
        <TotalTasks/>
        </div>
             
    )
}

export default EditProfilePage;
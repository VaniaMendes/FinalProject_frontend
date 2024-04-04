
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfileByPO from "../components/editProfileByPO";
import React from "react";
import MenuProductOwner from "../components/MenuProductOwner";


function UserProfile(){

 
            
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
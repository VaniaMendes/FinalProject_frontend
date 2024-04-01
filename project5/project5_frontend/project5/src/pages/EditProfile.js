
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import 'react-notifications/lib/notifications.css';
import EditProfile from "../components/edit_profile";
import React from "react";
import { userStore } from "../stores/UserStore";
import { navigate } from "@reach/router";
import { useEffect } from "react";


function EditProfilePage(){

    //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;




// useEffect para redirecionar para a página de login se o token não existir
useEffect(() => {
    if(tokenUser === null) {
      navigate("/login");
    }
  }, []);
  
            
    return(
       <div> 
        
        <MainPage/>
        <SideMenu/>
        <EditProfile/>
        </div>
             
    )
}

export default EditProfilePage;
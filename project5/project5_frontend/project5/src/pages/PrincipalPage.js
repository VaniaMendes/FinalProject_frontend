import React, {useEffect} from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import {userStore} from '../stores/UserStore';
import { useNavigate } from "react-router-dom";



function PrincipalPage(){
    

    const { getRole } = userStore();
    const role = getRole();

const navigate = useNavigate();


if(role===null){
  navigate('/authentication');

}
   
    return(
        <div>
           
                 
            <HomePage />
            <SideMenu />
            {(role === 'scrum_master' || role==='product_owner') && <SearchFields />}
            <ScrumBoard />
        </div>
    );
}
    
    export default PrincipalPage;


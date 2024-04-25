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
//Obtem o token da store
const tokenUser = userStore((state) => state.token.token);
const navigate = useNavigate();


   
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


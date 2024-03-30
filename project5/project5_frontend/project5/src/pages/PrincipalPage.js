import React from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import MenuProductOwner from '../components/MenuProductOwner';
import MenuScrum from '../components/MenuScrum';
import {userStore} from '../stores/UserStore';



function PrincipalPage(){

   
    const { getRole } = userStore();
    const role = getRole();
   

    return(
        <div>
            
            {role === 'product_owner' && <MenuProductOwner />}
            {role === 'scrum_master' && <MenuScrum/>}
            <HomePage />
            <SideMenu />
            {(role === 'scrum_master' || role==='product_owner') && <SearchFields />}
            <ScrumBoard />
        </div>
    );
}
    
    export default PrincipalPage;


import React from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import MenuProductOwner from '../components/MenuProductOwner';
import MenuScrum from '../components/MenuScrum';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom'

function PrincipalPage(){
    
  
  const navigate = useNavigate();
    const { getRole } = userStore();
    const role = getRole();

    
    //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  if (!tokenUser) {
    navigate("/login"); // Redireciona para a página de login se não estiver autenticado
    return null; // Retorna null para evitar renderização da página
  }

   
    return(
        <div>
           
            {role === 'product_owner' && <MenuProductOwner />}
            {(role === 'scrum_master' || role ==='developer') && <MenuScrum/>}
         
            <HomePage />
            <SideMenu />
            {(role === 'scrum_master' || role==='product_owner') && <SearchFields />}
            <ScrumBoard />
        </div>
    );
}
    
    export default PrincipalPage;


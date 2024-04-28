
import MainPage from '../components/MainPage';
import NewUser from '../components/NewUser';
import {showModal} from '../stores/boardStore';
import { useEffect } from 'react';
import Language from '../components/language';
import SideMenu from '../components/SideMenu';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom';


function Register(){

  const {role} = userStore();

  const navigate = useNavigate();

  if(role===null){
    navigate('/authentication');
  
  }
 
  //Estados para controlar a exibição do modal de newUser
  const {showNewUserModal, setShowNewUserModal} = showModal();

  //Efeito para renderizar a pagina
  useEffect(() => {
    setShowNewUserModal(true);
  }, [setShowNewUserModal, showNewUserModal]);


    return( 

        <div>
        <MainPage/>
        <div className="location1">  <Language/> </div>
        <NewUser/>
        <SideMenu/>
      
        </div>

    )
}

export default Register;

import MainPage from '../components/MainPage';
import NewUser from '../components/NewUser';
import {showModal} from '../stores/boardStore';
import { useEffect } from 'react';



function Register(){

 
  //Estados para controlar a exibição do modal de newUser
  const {showNewUserModal, setShowNewUserModal} = showModal();

  //Efeito para renderizar a pagina
  useEffect(() => {
    setShowNewUserModal(true);
  }, [showNewUserModal]);


    return( 

        <div>
        <MainPage/>
        <NewUser/>
    
        </div>

    )
}

export default Register;
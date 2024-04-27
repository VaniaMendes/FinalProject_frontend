
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom'


function ActiveUsers(){
 
  
  const {role} = userStore();

  const navigate = useNavigate();

  if(role===null){
    navigate('/authentication');
  
  }

  return (
    <div>
     
          <MainPage/>
          <SideMenu/>
          <UserTable/>
        
    </div>
  );
  }

export default ActiveUsers;
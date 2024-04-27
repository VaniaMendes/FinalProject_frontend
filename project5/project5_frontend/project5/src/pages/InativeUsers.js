
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import InactiveUsersTable from '../components/InativeUsersTable';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom';




function InativeUsersPage(){
  const { getRole } = userStore();
  const role = getRole();


  const navigate = useNavigate();

  if(role===null){
    navigate('/authentication');
  
  }

  return (
    <div>
   
          <MainPage/>
          <SideMenu/>
          <InactiveUsersTable/>
 
    </div>
  );
  }

export default InativeUsersPage;
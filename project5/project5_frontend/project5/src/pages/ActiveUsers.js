
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import {userStore} from '../stores/UserStore';


function ActiveUsers(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
     
          <MainPage/>
          <SideMenu/>
          <UserTable/>
        
    </div>
  );
  }

export default ActiveUsers;
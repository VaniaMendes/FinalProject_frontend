
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import InactiveUsersTable from '../components/InativeUsersTable';
import {userStore} from '../stores/UserStore';




function InativeUsersPage(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
   
          <MainPage/>
          <SideMenu/>
          <InactiveUsersTable/>
 
    </div>
  );
  }

export default InativeUsersPage;
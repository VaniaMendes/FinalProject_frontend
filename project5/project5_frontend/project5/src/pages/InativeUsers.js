
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import InactiveUsersTable from '../components/InativeUsersTable';
import {userStore} from '../stores/UserStore';
import MenuScrum from '../components/MenuScrum';



function InativeUsersPage(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
      {(role === "scrum_master" || role==="developer") ? (
        <>
          <MenuScrum />
          <MainPage/>
          <SideMenu/>
          <InactiveUsersTable/>
         
        </>
      ) : (
        <>
       
          <MainPage/>
          <SideMenu/>
          <MenuProductOwner/>
          <InactiveUsersTable/>
        </>
      )}
    </div>
  );
  }

export default InativeUsersPage;
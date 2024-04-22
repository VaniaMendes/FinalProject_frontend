
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import {userStore} from '../stores/UserStore';
import MenuScrum from '../components/MenuScrum';



function ActiveUsers(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
      {(role === "scrum_master" || role==="developer") ? (
        <>
          <MenuScrum />
          <MainPage/>
          <SideMenu/>
          <UserTable/>
         
        </>
      ) : (
        <>
       
          <MainPage/>
          <SideMenu/>
          <MenuProductOwner/>
          <UserTable/>
        </>
      )}
    </div>
  );
  }

export default ActiveUsers;
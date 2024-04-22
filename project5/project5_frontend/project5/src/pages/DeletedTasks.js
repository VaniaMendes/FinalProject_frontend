
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import InativeTasksTable from '../components/InativeTasksTable';
import {userStore} from '../stores/UserStore';
import MenuScrum from '../components/MenuScrum';



function DeletedTasks(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
      {(role === "scrum_master" || role==="developer") ? (
        <>
          <MenuScrum />
          <MainPage/>
          <SideMenu/>
          <InativeTasksTable/>
         
        </>
      ) : (
        <>
       
          <MainPage/>
          <SideMenu/>
          <MenuProductOwner/>
          <InativeTasksTable/>
        </>
      )}
    </div>
  );
  }

export default DeletedTasks;
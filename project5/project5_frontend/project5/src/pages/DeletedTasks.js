
import MainPage from '../components/MainPage';

import SideMenu from '../components/SideMenu';
import InativeTasksTable from '../components/InativeTasksTable';
import {userStore} from '../stores/UserStore';




function DeletedTasks(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
      
          <MainPage/>
          <SideMenu/>
          <InativeTasksTable/>
      
    </div>
  );
  }

export default DeletedTasks;
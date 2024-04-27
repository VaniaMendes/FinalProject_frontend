
import MainPage from '../components/MainPage';

import SideMenu from '../components/SideMenu';
import InativeTasksTable from '../components/InativeTasksTable';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom';




function DeletedTasks(){
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
          <InativeTasksTable/>
      
    </div>
  );
  }

export default DeletedTasks;
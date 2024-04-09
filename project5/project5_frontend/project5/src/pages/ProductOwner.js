
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import CategoriesTable from '../components/CategoriesTable';
import InactiveUsersTable from '../components/InativeUsersTable';
import {tables} from '../stores/boardStore';
import InativeTasksTable from '../components/InativeTasksTable';
import {userStore} from '../stores/UserStore';
import MenuScrum from '../components/MenuScrum';
import { useNavigate } from "react-router-dom";


function ProductOwner(){
  const { showUserTable, showCategoriesTable, showInactiveUsersTable, showInativeTasksTable } = tables();
  const { getRole } = userStore();
  const role = getRole();

   //Obtem o token da store
   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
   const navigate = useNavigate();
 
   if(!tokenUser){
     navigate("/login");
     
   }
  
  return (
    <div>
      {(role === "scrum_master" || role==="developer") ? (
        <>
          <MenuScrum />
          {showUserTable && <UserTable />}
          {showInactiveUsersTable && <InactiveUsersTable />}
          {showInactiveUsersTable && <InactiveUsersTable />}
          {showInativeTasksTable && <InativeTasksTable />}
          <MainPage/>
          <SideMenu/>
         
        </>
      ) : (
        <>
          {showUserTable && <UserTable />}
          {showCategoriesTable && <CategoriesTable />}
          {showInactiveUsersTable && <InactiveUsersTable />}
          {showInativeTasksTable && <InativeTasksTable />}
          <MainPage/>
          <SideMenu/>
          <MenuProductOwner/>
        </>
      )}
    </div>
  );
  }

export default ProductOwner;
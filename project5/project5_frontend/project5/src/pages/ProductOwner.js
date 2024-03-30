
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


function ProductOwner(){
  const { showUserTable, showCategoriesTable, showInactiveUsersTable, showInativeTasksTable } = tables();
  const { getRole } = userStore();
  const role = getRole();
  
  return (
    <div>
      {role === "scrum_master" ? (
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
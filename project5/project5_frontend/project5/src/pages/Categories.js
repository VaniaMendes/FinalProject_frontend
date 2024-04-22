
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import Categories from '../components/CategoriesTable';
import {userStore} from '../stores/UserStore';
import MenuScrum from '../components/MenuScrum';



function CategoriesPage(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
      {(role === "scrum_master" || role==="developer") ? (
        <>
          <MenuScrum />
          <MainPage/>
          <SideMenu/>
          <Categories/>
         
        </>
      ) : (
        <>
       
          <MainPage/>
          <SideMenu/>
          <MenuProductOwner/>
          <Categories/>
        </>
      )}
    </div>
  );
  }

export default CategoriesPage;
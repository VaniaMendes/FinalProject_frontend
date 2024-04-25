
import MainPage from '../components/MainPage';

import SideMenu from '../components/SideMenu';
import Categories from '../components/CategoriesTable';
import {userStore} from '../stores/UserStore';




function CategoriesPage(){
  const { getRole } = userStore();
  const role = getRole();

  return (
    <div>
     
          <MainPage/>
          <SideMenu/>
          <Categories/>
       
    </div>
  );
  }

export default CategoriesPage;
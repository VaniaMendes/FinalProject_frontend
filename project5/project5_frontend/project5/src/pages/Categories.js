
import MainPage from '../components/MainPage';

import SideMenu from '../components/SideMenu';
import Categories from '../components/CategoriesTable';
import {userStore} from '../stores/UserStore';
import {useNavigate} from 'react-router-dom';




function CategoriesPage(){
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
          <Categories/>
       
    </div>
  );
  }

export default CategoriesPage;
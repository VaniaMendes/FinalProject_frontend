

import { FaUsers } from "react-icons/fa6";
import { useNavigate  } from 'react-router-dom';
import {tables} from '../stores/boardStore';
import { MdTask } from "react-icons/md";
import { userStore } from "../stores/UserStore";

function MenuScrum(){

        //Este componente renderiza os botoes especificos para quando o utilizador é scrum_master
   

        
  //Obtem o tipo de utilizador da store
  const {  getRole } = userStore();
  const role = getRole();
   const navigate = useNavigate();
  

   //Obtem os estado para exibir as tabelas da store
    const { setShowUserTable, setShowCategoriesTable, setShowInactiveUsersTable, setInativeTasksTable } = tables();

    // Função para lidar com a exibição da tabela de utilizadores
    const handleShowUserTable = () => {
       setShowUserTable(true);
       setShowCategoriesTable(false);
       setShowInactiveUsersTable(false);
       setInativeTasksTable(false);
       navigate('/productOwner');
    }

    // Função para lidar com a exibição da tabela de tarefas inativas
    const handleInativeTasks = () => {
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
        setShowCategoriesTable(false);
        setInativeTasksTable(true);
        navigate('/productOwner');
    }
  
return(

    <div className="menuPO1">

    <div className='menuPO'>
        <ul>
 
        <li className='item_PO' onClick={handleShowUserTable}> <FaUsers/> Users</li>
        {role==="scrum_master"  &&(
        <li className='item_PO' onClick={handleInativeTasks}> <MdTask/> Deleted Tasks</li>)}
        </ul>
  
</div>
</div>
)

}

export default MenuScrum;


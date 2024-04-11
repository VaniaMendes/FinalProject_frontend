
import {useState} from 'react';
import { FaUsers } from "react-icons/fa6";
import { MdTask } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { useNavigate  } from 'react-router-dom';
import {tables} from '../stores/boardStore';
import { AiFillDashboard } from "react-icons/ai";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import { userStore } from '../stores/UserStore';

function MenuProductOwner(){

    //Este componente renderiza os botoes especificos para quando o utilizador é product_owner
   
   const navigate = useNavigate();

   //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);

    //Estado para controlar a exibição dos botões
    const [showButtons, setShowButtons] = useState(false);

    //Função para exibir ou ocultar os botoes associados ao botão USERS
    const seeButtons = () => {
        setShowButtons(!showButtons);
    };

    //Obtém do store os estados para exibição das tabelas
    const { setShowUserTable, setShowCategoriesTable, setShowInactiveUsersTable, setInativeTasksTable } = tables();

    // Função para exibir a tabela de usuários ativos
    const handleShowUserTable = () => {
       setShowUserTable(true);
       setShowCategoriesTable(false);
       setShowInactiveUsersTable(false);
       setInativeTasksTable(false);
       navigate('/productOwner');
    }
  
    // Função para exibir a tabela de categorias
    const handleShowCategoriesTable = () => {
        setShowCategoriesTable(true);
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
        setInativeTasksTable(false);
        navigate('/productOwner');
    };

     // Função para exibir a tabela de utilizadores inativos
    const handleInativeUsers = () => {
        setShowInactiveUsersTable(true);
        setShowUserTable(false);
        setShowCategoriesTable(false);
        setInativeTasksTable(false);
        navigate('/productOwner');
    }

    //Função para exibir a tabela de tarefas inativas
    const handleInativeTasks = () => {
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
        setShowCategoriesTable(false);
        setInativeTasksTable(true);
        navigate('/productOwner');
    }

    const handleDashboard = () => {
        navigate('/dashboard');
    }

   
return(

    <div className="menuPO1">
        <IntlProvider locale={locale} messages={languages[locale]}> 

    <div className='menuPO'>
        
    <ul>
        <li className='item_PO' onClick={seeButtons}> <FaUsers/><FormattedMessage id="users">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></li>
        {showButtons && (
                    <ul>
                        <li className='item_PO' id='active' onClick={handleShowUserTable}><FaUserCheck className='icon'/>
                        
                        <FormattedMessage id="active">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                        
                        </li>
                        <li className='item_PO' id='active' onClick={handleInativeUsers}><FaUserAltSlash className='icon'/>
                        
                        <FormattedMessage id="inactive">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                        </li>
                    </ul>
                )}
        <li  className='item_PO'  onClick={handleInativeTasks}> <MdTask/><FormattedMessage id="deletedTasks">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></li>
        <li  className='item_PO'  onClick={handleShowCategoriesTable}><BiSolidCategoryAlt/> <FormattedMessage id="categories">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></li>
        <li className = 'item_PO' onClick={handleDashboard}> <AiFillDashboard/> <FormattedMessage id="dashboard">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></li>
    </ul>
</div>
</IntlProvider>
</div>
)

}

export default MenuProductOwner;
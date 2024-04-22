
import {useState} from 'react';
import { FaUsers } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { useNavigate  } from 'react-router-dom';
import { AiFillDashboard } from "react-icons/ai";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import { userStore } from '../stores/UserStore';
import { BiTaskX } from "react-icons/bi";

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


    // Função para exibir a tabela de usuários ativos
    const handleShowUserTable = () => {
       navigate('/activeUsers');
    }
  
    // Função para exibir a tabela de categorias
    const handleShowCategoriesTable = () => {
        navigate('/categories');
    };

     // Função para exibir a tabela de utilizadores inativos
    const handleInativeUsers = () => {
        navigate('/inactiveUsers');
    }

    //Função para exibir a tabela de tarefas inativas
    const handleInativeTasks = () => {
        navigate('/deletedTasks');
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
        <li  className='item_PO'  onClick={handleInativeTasks}> <BiTaskX/><FormattedMessage id="deletedTasks">
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
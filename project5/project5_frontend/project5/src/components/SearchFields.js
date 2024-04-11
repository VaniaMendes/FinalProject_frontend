 import React, { useEffect, useState } from "react"
 import { getAllCategories } from "../endpoints/categories";
 import { getActiveUsers } from "../endpoints/users";
 import { userStore } from "../stores/UserStore";
 import {getFilteredTasks} from '../endpoints/tasks';
 import { NotificationManager } from "react-notifications";
 import {showModal} from '../stores/boardStore';
 import { LuSearchCheck } from "react-icons/lu";
 import { MdOutlineCleaningServices } from "react-icons/md";
 import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
 
function SearchFields(){ 

    //Obtem o token da store
    const tokenObject = userStore((state) => state.token);
    const tokenUser = tokenObject.token;

      //Obtem a linguagem de exibição da página
      const locale = userStore((state) => state.locale);


    //Estado para guardar a lista de users e de categorias e serem apresentadas nos campos de pesquisa
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    
    //Estado para guarar o username e a categoria para pesquisar as tarefas
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    //Estado para controlar a exibição da lista filtrada
    const {setFilterOn} = showModal();


// Efeito para buscar categorias e usuários ativos
useEffect(() => {
    const fetchData = async()=> {
        const categories = await getAllCategories(tokenUser);
        setCategories(categories);
        const users = await getActiveUsers(tokenUser);
        setUsers(users);
 
    };
    fetchData();
},[]);

// Manipuladores de evento para alterar o utilizador selecionado e a categoria selecionada
const handleUserChange = (event) => {
    setSelectedUsername(event.target.value);
};

const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
};

// Função para filtrar tarefas com base no utilizador e categoria selecionados
const handleFilter = async (tokenUser, selectedUsername, selectedCategoryId) => {
    const result = await getFilteredTasks(tokenUser, selectedUsername, selectedCategoryId);

    if(result !== null){
        userStore.getState().setFilteredTasks(result);//Guarda a lista filtrada no userStore
        setFilterOn(true);//Ativa o estado para exibir a lista filtrada

    }else{
        NotificationManager.warning("No tasks found", "", 800);
    }
    

}

// Função para limpar os campos de pesquisa
const handleResetFilter = () => {
    setSelectedUsername("");
    setSelectedCategoryId("");
    document.getElementById("category").value = "";
    document.getElementById("users").value = "";
    userStore.getState().setFilteredTasks(null);//Limpa a lista filtrada no userStore
    setFilterOn(false);//Desativa o estado para exibir a lista filtrada
}


return (
 
 <div className="filter">
    <IntlProvider locale={locale} messages={languages[locale]}>
               <div className="searchFields">
               <select id="category"  defaultValue="" onChange={handleCategoryChange}>
               <option value="" disabled><FormattedMessage id="filterByCategory">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.idCategory}>{category.title}</option>
                    ))}
                   
               </select>
               <select id="users" defaultValue="" onChange={handleUserChange}>
               <option value="" disabled><FormattedMessage id="filterByUser">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>{user.firstName}</option>
                    ))}
               
               </select>
               <div className="search_icon"> <p className="search-icon" onClick={() => handleFilter(tokenUser, selectedUsername, selectedCategoryId)}><LuSearchCheck className='icon-search' title='Search'/></p></div>
               <div className="reset_search_icon"> <p className="reset-filter-icon" onClick={ handleResetFilter}><MdOutlineCleaningServices className='icon-search' title="Clear Filter"/></p></div>
            </div>
            </IntlProvider>
           </div>

           )
}

export default SearchFields;

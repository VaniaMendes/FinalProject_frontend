import React, {useState, useEffect} from 'react';
import {userStore} from '../stores/UserStore';
import {  NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { MdOutlineRestore } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import "../format/tables.css";
import { deleteUserForever, restoreUser} from '../endpoints/users';
import {getInactiveUsers} from '../endpoints/users';


function InactiveUsersTable() {

    //Obtem o token do utilizador
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
      
    //Estado para armazenar os users inativos
    const [inativeUsers, setInativeUsers] = useState(null);

    //Efeito para ir buscar os users inativos ao renderizar o componente
    useEffect(() => {
        const fetchData = async () => {
          const users = await getInactiveUsers(tokenUser);
          setInativeUsers(users);
        };
        fetchData();
      }, [tokenUser]);
    
    //Função para restaurar um utilizador inativo
    async function handleRestore (tokenUser, username) {
       const result= await restoreUser(tokenUser, username);
       if(result){
        NotificationManager.success("User restored successfully", "", 1000);
        const updatedUsers = inativeUsers.filter((user) => user.username !== username);
        setInativeUsers(updatedUsers);
        
       }else{
        NotificationManager.error("Failed to restore user", "", 1000);
       }
        
    }
    

    //Função para apagar definitivamente um user da tabela de users inativos
    const handleDeleteForever = (tokenUser, username) => {
        NotificationManager.info("Are you sure you want to delete this user?", "Confirm", 7000, () => {
            //Se o utilizador confirmar vai chamar a função
            deleteUserForever(tokenUser, username)
                .then(result => {
                    if (result===true) {
                        NotificationManager.success("User deleted successfully", "", 1000);
                    } else {
                        NotificationManager.error("Failed to delete user", "", 1000);
                    }
                })
                .catch(error => {
                    NotificationManager.error("Error deleting user");
                });
        });
    };

    return (
      
            
        <div className='table_container'>
        <table id="users_table">
       
        <thead >
            <tr >
            <th className='titleUser'><img src='user_icon.png'></img></th>
            <th className='titleUser1'>Inactive Users</th>
            <th className='titleUser'></th>
            <th className = 'titleUser'></th>
            <th className = 'titleUser'></th>
            <th className = 'titleUser'>
   
                </th>
                </tr>
           
                <tr className="header">
                    <th className='image'></th>
                    <th >Name</th>
                    <th >Email</th>
                    <th >Phone</th>
                    <th >Role</th>
                    <th>User Edition</th>

                </tr>
            </thead>
            <tbody className = 'body'>
                {inativeUsers && inativeUsers.map((user, index) => (
                    <tr key={index}>
                        <td ><img className='imagem_user' src={user.imgURL} alt='user.png' /></td>
                        <td>{user.firstName + "  " + user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                        {user.typeOfUser === 'developer' ? 'Developer' : 
                         user.typeOfUser === 'scrum_master' ? 'Scrum Master' :
                        user.typeOfUser === 'product_owner' ? 'Product Owner' : ''}
                        </td>
                        <td>
                            <button className='edit_button' onClick={() => handleRestore(tokenUser, user.username)}><MdOutlineRestore /></button>
                            <button className='delete_button' onClick={() => handleDeleteForever(tokenUser, user.username)}><MdDeleteForever /></button>
                           
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    
    );
}

export default InactiveUsersTable;

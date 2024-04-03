import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { userStore } from "../stores/UserStore";
import "../format/tables.css";
import { deleteUser } from "../endpoints/users";
import NewUser from "./NewUser";
import { NotificationManager } from "react-notifications";
import{ getActiveUsers} from '../endpoints/users';
import { showModal, updateUsersTable } from '../stores/boardStore';
import {deleteUserTasks} from '../endpoints/tasks';
import EditProfileByPO from "./editProfileByPO";
import ButtonsForScrum from "./buttonsForScrum";

function UserTable() {
//Este componente exibe a tabela de utilizadores ativos


//Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const [users, setUsers] = useState(null);
  const { showNewUserModal, setShowNewUserModal } = showModal();
  const { showModalEditUser, setShowModalEditUser } = showModal();
  const {showUsersTable} = updateUsersTable();

  //Vai buscar o role guardado na userStore quando o user faz login
  const { getRole } = userStore();
  const role = getRole();

  //Efeito para ir buscar a lista de users
  useEffect(() => {
        const fetchData = async()=> {
          const users = await getActiveUsers(tokenUser);
          setUsers(users);
              
         };
         fetchData();
        }, [tokenUser, showUsersTable]);

//Funçao para editar um utilizador
  const handleEdit = async (username) => {
    setShowModalEditUser(true);//Mostra o modal de edição
    userStore.setState({ username: username });//Guarda o nome do username do utilizador a ser editado
  };

  //Função para abrir o modal de criação de novo utilizador	
const openModal= ()=>{
  setShowNewUserModal(true);
 
};


//Função para excluir um utilizador temporariamente
const handleDelete = async (tokenUser, username) => {
  try {
    const result = await deleteUser(tokenUser, username);
    if (result === true) {
      NotificationManager.success("User deleted successfully", "", 1000);
      //Atualiza a lista de users excluindo o user eliminado
      const updatedUsers = users.filter((user) => user.username !== username);
      setUsers(updatedUsers);
    } else {
      NotificationManager.error("Failed to delete user");
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    NotificationManager.error("Failed to delete user");
  }
};

//Função para apagar todas as tarefas de um utilizador
const handleDeleteTasks = async (tokenUser, username) => {
  try {
    const result = await deleteUserTasks(tokenUser, username);
    if (result === true) {
      NotificationManager.success("User tasks deleted successfully", "", 1000);
    } else {
      NotificationManager.error("Failed to delete user tasks");
    }
  } catch (error) {
    console.error("Error deleting user tasks:", error);
    NotificationManager.error("Failed to delete user tasks");
  }
};

  return (
        
    <div>
     
    <div className="table_container">
      
        <table className="users_table">
          <thead >
            <tr  >
              <th className="titleUser"><img src="icon-green.png"></img></th>
              <th className="titleUser2">Active Users</th>
              <th className="titleUser">
                {/* Cabeçalho da coluna de edição de usuário, visível apenas para determinados papéis de usuário */}
              {role !== "scrum_master" && (
    <button id="btn_user" onClick={openModal}>+New User</button>
  )}
              </th>
              <th className="titleUser">
                
              </th>
              <th className="titleUser"></th>
              <th className="titleUser">
                
              </th>
            </tr>
            <tr className="header">
              <th className="image"></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              {role !== "scrum_master" ? (
    <th>User Edition</th>
  ) : (
    <th>User Consult</th>
  )}
            </tr>
          </thead>
          
          <tbody className="body">
            {/* Renderiza a lista de usuários */}
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="imagem_user"
                      src={user.imgURL}
                      alt="user.png"
                    />
                  </td>
                  <td>{user.firstName + "  " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.typeOfUser === "developer"
                      ? "Developer"
                      : user.typeOfUser === "scrum_master"
                      ? "Scrum Master"
                      : user.typeOfUser === "product_owner"
                      ? "Product Owner"
                      : ""}
                  </td>
                  <td>
                    {role === "scrum_master" ? (
                      <ButtonsForScrum  username={user.username} /> //Se for Scrum Master, apresenta só o componente que tem apenas o botão consulta de perfil
                    ) : (
                      <>
                        <button
                          className="edit_button"
                          onClick={() => handleEdit(user.username)}
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          className="delete_button"
                          onClick={() => handleDelete(tokenUser, user.username)}
                        >
                          <MdAutoDelete />
                        </button>
                        <button
                          className="delete_task"
                          onClick={() =>
                            handleDeleteTasks(tokenUser, user.username)
                          }
                        >
                          Delete Tasks
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
</div>
  {/* Renderiza os modais de edição e adição do utilizador */}
  {showModalEditUser && <EditProfileByPO/>}
    {showNewUserModal && <NewUser/>}</div>
  );
}

export default UserTable;

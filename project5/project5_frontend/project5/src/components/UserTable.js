import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { userStore } from "../stores/UserStore";
import "../format/tables.css";
import { deleteUser, getUsersByName, getUsersByEmail } from "../endpoints/users";
import { NotificationManager } from "react-notifications";
import { getActiveUsers } from "../endpoints/users";
import { showModal } from "../stores/boardStore";
import { deleteUserTasks } from "../endpoints/tasks";
import ButtonsForScrum from "./buttonsForScrum";
import { useNavigate } from "react-router-dom";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

function UserTable() {
  //Este componente exibe a tabela de utilizadores ativos

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;



  const {showModalEditUser, setShowModalEditUser} = showModal();

   //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

   //Guarda a lista de utilizadores
  const [users, setUsers] = useState([]);

  //Guarda o estado do prefix a pesquisar para filtrar a lista por nome
  const [prefix, setPrefix] = useState("");

  // Estado para armazenar a última lista de usuários encontrada
const [lastUsers, setLastUsers] = useState([]);



  const navigate = useNavigate();
  //Vai buscar o role guardado na userStore quando o user faz login
  const { getRole } = userStore();
  const role = getRole();

  //Efeito para ir buscar a lista de users
  useEffect(() => {
    const fetchData = async () => {
      const users = await getActiveUsers(tokenUser);
      setUsers(users);
    };
    fetchData();
  }, [tokenUser]);

  //Funçao para editar um utilizador
  const handleEdit = async (username) => {
    userStore.setState({ username: username }); //Guarda o nome do username do utilizador a ser editado
    navigate("/profile/" + username);
    setShowModalEditUser(true);
  };

  //Função para abrir o modal de criação de novo utilizador
  const openModal = () => {
    navigate("/register");
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
        NotificationManager.success(
          "User tasks deleted successfully",
          "",
          1000
        );
      } else {
        NotificationManager.error("Failed to delete user tasks");
      }
    } catch (error) {
      console.error("Error deleting user tasks:", error);
      NotificationManager.error("Failed to delete user tasks");
    }
  };

  //Função para filtrar a tabela de utilizadores pelo nome
const handleFilterName = async (tokenUser, prefix) => {
  try {
    if (prefix.trim() === "") {
      // Se o prefixo estiver vazio, buscar todos os usuários novamente
      const allUsers = await getActiveUsers(tokenUser);
      setUsers(allUsers);
      setLastUsers(allUsers); //Atualiza a última lista de users encontrada
    } else {
      // Se houver um prefixo, buscar os usuários pelo nome iniciado com o prefixo
      const filteredUsers = await getUsersByName(tokenUser, prefix);
      if (filteredUsers.length === 0) {
        // Se nenhum usuário foi encontrado, mostrar uma mensagem ao usuário
        setUsers(users || []);
        
      } else {
        setUsers(filteredUsers);
        setLastUsers(filteredUsers); //Atualiza a última lista de users encontrada
      }
    }
  } catch (error) {
    console.error("Erro ao filtrar usuário:", error);
  }
};

 //Função para filtrar a tabela de utilizadores pelo nome
 const handleFilterEmail = async (tokenUser, prefix) => {
  try {
    if (prefix.trim() === "") {
      // Se o prefixo estiver vazio, buscar todos os usuários novamente
      const allUsers = await getActiveUsers(tokenUser);
      setUsers(allUsers);
    } else {
      // Se houver um prefixo, buscar os usuários pelo nome iniciado com o prefixo
      const filteredUsers = await getUsersByEmail(tokenUser, prefix);
      if (filteredUsers.length === 0) {
        // Se nenhum usuário foi encontrado, mostrar uma mensagem ao usuário
        setUsers(users || []);
        
      } else {
        setUsers(filteredUsers);
        setLastUsers(filteredUsers); //Atualiza a última lista de users encontrada
      }
    }
  } catch (error) {
    console.error("Erro ao filtrar usuário:", error);
  }
};

  return (
    <div>
      <IntlProvider locale={locale} messages={languages[locale]}>
      <div className="table_container">
        <table className="users_table">
          <thead>
            <tr>
              <th className="titleUser">
                <img src="icon-green.png"></img>
              </th>
              <th className="titleUser2"><FormattedMessage id="ativeUsers">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th className="titleUser">
                {/* Cabeçalho da coluna de edição de usuário, visível apenas para determinados papéis de usuário */}
                {role !== "scrum_master" && (
                  <button id="btn_user" onClick={openModal}>
                   <FormattedMessage id="newUser">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                  </button>
                )}
              </th>
              <th className="titleUser"></th>
              <th className="titleUser">
                {" "}
                <input
                  placeholder="Filter By Name"
                               onChange={(e) => {
                    setPrefix(e.target.value);
                    handleFilterName(tokenUser, e.target.value);
                  }}
                ></input>
              </th>
              <th className="titleUser">
                {" "}
                <input placeholder="Filter By Email"
                onChange={(e) => {
                  setPrefix(e.target.value);
                  handleFilterEmail(tokenUser, e.target.value);
           
                }}
                ></input>
              </th>
            </tr>
            <tr className="header">
              <th className="image"></th>
              <th><FormattedMessage id="name">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="email">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="phoneNumber">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="role">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              {role !== "scrum_master" ? (
                <th><FormattedMessage id="userEdition">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
              ) : (
                <th></th>
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
                  <td >{user.phoneNumber}</td>
                  <td >
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
                      <ButtonsForScrum username={user.username} /> //Se for Scrum Master, apresenta só o componente que tem apenas o botão consulta de perfil
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
                         <FormattedMessage id="deleteTasks">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </IntlProvider>
    </div>
  );
}

export default UserTable;

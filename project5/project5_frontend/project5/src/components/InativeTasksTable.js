import React, { useState } from "react";
import { getAllInactiveTasks } from "../endpoints/tasks";
import { userStore } from "../stores/UserStore";
import { useEffect } from "react";
import "../format/tables.css";
import { MdTask } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { NotificationManager } from "react-notifications";
import { MdOutlineRestore } from "react-icons/md";
import { hardDeleteTask, restoreTask } from "../endpoints/tasks";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

const InativeTasksTable = () => {
  //Obtém o token do utilizador
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Estado para armazenar as tarefas inativas
  const [tasks, setTasks] = useState([]);

  //Obtem o tipo de utilizador
  const { getRole } = userStore();
  const role = getRole();

      //Obtem a linguagem de exibição da página
      const locale = userStore((state) => state.locale);

  //Função para ir buscar as tarefas inativas
  const fetchTasks = async () => {
    try {
      const result = await getAllInactiveTasks(tokenUser);
      setTasks(result);
    } catch (error) {
      console.error(error);
    }
  };

  //Efeito para montar o componente com as tarefas inativas
  useEffect(() => {
    fetchTasks();
  }, []);

  //Função para apagar uma tarefa permanentemente
  const handleDeleteForever = (taskId, tokenUser) => {
    NotificationManager.info(
      "Are you sure you want to delete this task?",
      "Confirm",
      7000,
      () => {
        hardDeleteTask(taskId, tokenUser)
          .then((result) => {
            if (result === true) {
              NotificationManager.success(
                "Task deleted successfully",
                "",
                1000
              );
              fetchTasks();
            } else {
              NotificationManager.error("Failed to delete task", "", 1000);
            }
          })
          .catch((error) => {
            NotificationManager.error("Error deleting ");
          });
      }
    );
  };


  //Função para restaurar uma tarefa( passar do estado inativo para ativo)
  const handleRestore = async (tokenUser, taskId) => {
    try {
      const result = await restoreTask(tokenUser, taskId);

      if (result === 200) {
        NotificationManager.success("Task restored successfully", "", 1000);
        fetchTasks();
      } else {
        NotificationManager.error(result, "", 1000);
      }
    } catch (error) {
      NotificationManager.error("Error deleting ");
    }
  };

  return (
    <div className="table_container">
      <IntlProvider locale={locale} messages={languages[locale]}>
      <table className="users_table">
        <thead>
          <tr>
            <th className="titleUser">
              <MdTask className="task_icon" />
            </th>
            <th className="titleUser3"><FormattedMessage id="deletedTasks">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th className="titleUser"></th>
            <th className="titleUser"></th>
            <th className="titleUser"></th>
            <th className="titleUser">
              {" "}
            
            </th>
            {role !== "scrum_master" ? (
              <th></th>
            ) : (
              <th className="titleUser"></th>
            )}
          </tr>
          <tr>
            <th><FormattedMessage id="author">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th><FormattedMessage id="title">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th><FormattedMessage id="description">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th><FormattedMessage id="initialDate">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th><FormattedMessage id="finalDate">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            <th><FormattedMessage id="priority">
                {(message) => <span>{message}</span>}
              </FormattedMessage></th>
            {role !== "scrum_master" ? (
              <th><FormattedMessage id="taskEdition">
              {(message) => <span>{message}</span>}
            </FormattedMessage></th>
            ) : (
              <th ></th>
            )}
          </tr>
        </thead>
        <tbody className="body">
          {tasks &&
            tasks.map((task, index) => {
              return (
                <tr key={index}>
                  <td>{task.author.username}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.initialDate}</td>
                  <td>{task.endDate}</td>
                  <td className="colorPriority">
                    {task.priority === 300 ? (
                      <FcHighPriority />
                    ) : task.priority === 200 ? (
                      <FcMediumPriority />
                    ) : task.priority === 100 ? (
                      <FcLowPriority />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>
                    {role !== "scrum_master" && (
                      <>
                        <button
                          className="edit_button"
                          onClick={() => handleRestore(tokenUser, task.id)}
                        >
                          <MdOutlineRestore />
                        </button>
                        <button
                          className="delete_button"
                          onClick={() =>
                            handleDeleteForever(task.id, tokenUser)
                          }
                        >
                          <MdDeleteForever />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      </IntlProvider>
    </div>
  );
};
export default InativeTasksTable;

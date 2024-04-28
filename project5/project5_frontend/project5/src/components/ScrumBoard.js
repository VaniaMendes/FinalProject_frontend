import React from "react";
import TaskBoard from "./TaskBoard";
import { useState, useEffect } from "react";
import "../format/ScrumBoard.css";
import { getActiveTasks } from "../endpoints/tasks";
import { userStore } from "../stores/UserStore";
import {
  showModalNewTask,
  showModal,
  modeEditTask,
  showMyTasks,
  ViewTaskDetails,
} from "../stores/boardStore";
import { updateTaskState } from "../endpoints/tasks";
import TaskDetails from "./TaskDetails";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import Task from "./Task";


function ScrumBoard() {
  //Este componente é responsãvel por renderizar tudo o que diz respeito ao scrum_board

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);

  //Obtem o estado de exibição do modal de NewTaks
  const { showNewTask, setShowNewTask } = showModalNewTask();

  //Obtem o estado de exibição das tarefas do próprio utilizador
  const { showUserTasks } = showMyTasks();

  //Obtem o estado para com 2 cliques abrir o modal de detalhes de uma tarefa
  const { showTaskDetails, setShowTaskDetails } = ViewTaskDetails();


  //Obtem o role do user
  const role = userStore((state) => state.role);
  //Obtem a lista de tarefas filtradas por categoria e/ou username guardado na store
  const filteredTasks = userStore((state) => state.filteredTasks);

  //Obtem a lista de tarefas do utilizador guardadas na store
  const myTasks = userStore((state) => state.myTasks);

  //Obtem informação se o filtro está ativado
  const { filterOn } = showModal();

  //Estado para guardar a listas de tasks a exibir no scrum_board
  const [listTasks, setListTasks] = useState([]);
  //Estado para guardar o id da tarefa para editar
  const [taskId, setTaskId] = useState(null);
  //Estado para guardar o estado de edição da tarefa
  const { setEditTask } = modeEditTask();

  //Função para exibir o modal de nova tarefa
  const handleNewTaskClick = () => {
    setShowNewTask(true);
  };

  //Função para manipular o clique duplo numa tarefa
  const handleTaskDoubleClick = (taskId) => {
    userStore.getState().setTaskIdForEdit(taskId); //Guardar o id da tarefa para a qual queremos consultar os detalhes
    setShowTaskDetails(true); // Exibe o modal de detalhes
  };

  //Função para manipular o clique no botão de edição de uma tarefa
  const handleEdit = (taskId) => {
    // Obtenha a tarefa a ser editada com base no taskId
    const taskToEdit = listTasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      userStore.getState().setTaskIdForEdit(taskId); //Guarda o id na store
      setEditTask(true); //Ativa o estado de edição de um atrefa
      setShowNewTask(true); //Exibe o modal de nova tarefa
    }
  };


  //Função para obter as tarefas ativas a serem mostradas no scrum_board
  useEffect(() => {
    const fetchData = async () => {

      //Se o filtro estiver ativado vai aparecer a lista de tarefas filtradas por categoria e/ou utilizador
      if (filterOn) {
        if (filteredTasks.length > 0) {
          setListTasks(filteredTasks);
        } else {
          //Se o filtro não estiver ativo serão exibidas todas as tarefas ativas da app
          const tasks = await getActiveTasks(tokenUser);
          setListTasks(tasks);
          
        }
      } else if (showUserTasks) {
        if (myTasks.length > 0) {
          // Se o modo de exibição de tarefas do utilizador estiver ativado, exibe apenas as tarefas do próprio utilizador
          setListTasks(myTasks);
        } else {
          //Se não exibe todas as tarefas ativas da app
        
          setListTasks(listTasks);
          
        }
      } else {
        //Senão exibe todas as tarefas ativas da app
        const tasks = await getActiveTasks(tokenUser);
        setListTasks(tasks);
      }
      
    };

    fetchData();
  }, [tokenUser, filteredTasks, myTasks, filterOn, showUserTasks]);



  useEffect(() => {
    const WS_URL = "ws://localhost:8080/project_backend/websocket/updateTask/";
    const websocket = new WebSocket(WS_URL + tokenUser);
    websocket.onopen = () => {
      console.log("WebSocket connection for tasks is open");

    };

    websocket.onmessage = (event) => {
      const updatedTask = JSON.parse(event.data);
      console.log("A new message is received!");
      console.log(updatedTask);

  
      setListTasks(prevTasks => {
        // Se a tarefa que vier do backend tiver estado ativo false,entao a tarefa será removida da lista
        if (updatedTask.active===false) {
          
          return prevTasks.filter(task => task.id !== updatedTask.id);  
       
        }
       
        // Verifica se a tarefa já existe
        const taskExists = prevTasks.some(task => task.id === updatedTask.id);
   
  
        if (taskExists) {
          // Se a tarefa existir, substitua-a
          return prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        } else {
          // Se a tarefa não existir, adicione-a à lista
          return [...prevTasks, updatedTask];
        }
      });
    };
  }, [listTasks, tokenUser]);

 
 
  // Função para ordenar as tarefas
  const sortTasks = (tasks) => {
    return tasks.sort((b, a) => {
      // Ordenar por prioridade
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      // Ordenar por data inicial
      if (a.initialDate !== b.initialDate) {
        return new Date(a.initialDate) - new Date(b.initialDate);
      }
      // Ordenar por data final
      return new Date(a.endDate) - new Date(b.endDate);
    });
  };

  //Listas de tarefas classificadas pelo estado(state)
  const todoList = listTasks
    ? sortTasks(listTasks.filter((tasks) => tasks.state === "toDo"))
    : [];
  const doingList = listTasks
    ? sortTasks(listTasks.filter((tasks) => tasks.state === "doing"))
    : [];
  const doneList = listTasks
    ? sortTasks(listTasks.filter((tasks) => tasks.state === "done"))
    : [];

  //Manipulação de eventos de arrastar e soltar
  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("taskId", taskId);
    setTaskId(taskId);
  };

  //Função para manipular o evento de soltar uma tarefa
  const handleDrop = async (event, tokenUser, taskId, newState) => {
    event.preventDefault();

    try {
      // Atualiza o estado da tarefa no servidor
      await updateTaskState(tokenUser, taskId, newState);
      //A atualização no srcumboard é feita através do task enviada pelo websocket
    } catch (error) {
      console.error("Failed to update task state:", error);
    }
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div className = "scrumForPhone">
      {showTaskDetails && <TaskDetails />}
      <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="scrum_section" id="scrum_section">
          <div className="column" id="column1">
            <div className="title">To Do</div>
            <section
              className="task_list"
              id="toDo"
              onDrop={(event) => handleDrop(event, tokenUser, taskId, "toDo")}
              onDragOver={allowDrop}
            >
              {todoList.map((task) => (
               <Task
               key={task.id}
               task={task}
               handleEdit={handleEdit}
               role={role}
               showUserTasks={showUserTasks}
               tokenUser={tokenUser}
               handleDragStart={handleDragStart}
               handleTaskDoubleClick={handleTaskDoubleClick}
             />
              ))}
            </section>
            <button id="btn_task" onClick={handleNewTaskClick}>
              <FormattedMessage id="newTasks">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
            </button>
            {showNewTask && <TaskBoard />}
          </div>
          <div
            className="column"
            id="column2"
            onDrop={(event) => handleDrop(event, tokenUser, taskId, "doing")}
            onDragOver={allowDrop}
          >
            <div className="title">Doing</div>
            <section className="task_list" id="doing">
              {doingList.map((task) => (
                <Task
                key={task.id}
                task={task}
                handleEdit={handleEdit}
                role={role}
                showUserTasks={showUserTasks}
                tokenUser={tokenUser}
                handleDragStart={handleDragStart}
                handleTaskDoubleClick={handleTaskDoubleClick}
              />
              ))}
            </section>
          </div>
          <div
            className="column"
            id="column3"
            onDrop={(event) => handleDrop(event, tokenUser, taskId, "done")}
            onDragOver={allowDrop}
          >
            <div className="title">Done</div>
            <section className="task_list" id="done">
              {doneList.map((task) => (
                 <Task
                 key={task.id}
                 task={task}
                 handleEdit={handleEdit}
                 role={role}
                 showUserTasks={showUserTasks}
                 tokenUser={tokenUser}
                 handleDragStart={handleDragStart}
                 handleTaskDoubleClick={handleTaskDoubleClick}
               />
              ))}
            </section>
          </div>
        </div>
      </IntlProvider>
    </div>
  );
}

export default ScrumBoard;



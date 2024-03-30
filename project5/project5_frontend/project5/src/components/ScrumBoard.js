import React from 'react';
import TaskBoard from './TaskBoard';
import {useState, useEffect} from 'react'
import '../format/ScrumBoard.css';
import {getActiveTasks} from '../endpoints/tasks';
import { userStore } from "../stores/UserStore";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { softDeleteTask} from '../endpoints/tasks';
import {NotificationManager } from "react-notifications";
import {showModalNewTask, showModal, modeEditTask, showMyTasks, ViewTaskDetails} from '../stores/boardStore';
import {updateTaskState} from '../endpoints/tasks';
import TaskDetails from './TaskDetails';




function ScrumBoard(){

  //Este componente é responsãvel por renderizar tudo o que diz respeito ao scrum_board

  //Obtem o token da store
   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
  
   //Obtem o estado de exibição do modal de NewTaks
   const {showNewTask,  setShowNewTask } = showModalNewTask();

   //Obtem o estado de exibição das tarefas do próprio utilizador
   const { showUserTasks } = showMyTasks();

   //Obtem o estado para com 2 cliques abrir o modal de detalhes de uma tarefa
   const {showTaskDetails, setShowTaskDetails} = ViewTaskDetails();


  //Obtem o role do user
   const role = userStore((state) => state.role);
   //Obtem a lista de tarefas filtradas por categoria e/ou username guardado na store
   const filteredTasks = userStore((state) => state.filteredTasks);

   //Obtem a lista de tarefas do utilizador guardadas na store
   const myTasks= userStore((state) => state.myTasks);
 
   //Obtem informação se o filtro está ativado
   const {filterOn} = showModal();
   
   //Estado para guardar a listas de tasks a exibir no scrum_board
   const [listTasks, setListTasks] = useState([]);
   //Estado para guardar o id da tarefa para editar
   const [taskId, setTaskId] = useState(null);
    //Estado para guardar o estado de edição da tarefa
   const { editTask, setEditTask} = modeEditTask();

   

//Função para exibir o modal de nova tarefa
   const handleNewTaskClick = () => {
    setShowNewTask(true);
   }

   //Função para manipular o clique duplo numa tarefa
   const handleTaskDoubleClick = (taskId) => {
    userStore.getState().setTaskIdForEdit(taskId);//Guardar o id da tarefa para a qual queremos consultar os detalhes
    setShowTaskDetails(true); // Exibe o modal de detalhes
  };


  //Função para manipular o clique no botão de edição de uma tarefa
   const handleEdit = (taskId) => {
    // Obtenha a tarefa a ser editada com base no taskId
  const taskToEdit = listTasks.find(task => task.id === taskId);
  if(taskToEdit){
    userStore.getState().setTaskIdForEdit(taskId);//Guarda o id na store
    setEditTask(true);//Ativa o estado de edição de um atrefa
    setShowNewTask(true);//Exibe o modal de nova tarefa
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
        if(myTasks.length > 0){   
          // Se o modo de exibição de tarefas do utilizador estiver ativado, exibe apenas as tarefas do próprio utilizador     
        setListTasks(myTasks);
        } else {
          //Se não exibe todas as tarefas ativas da app
          NotificationManager.warning("This user has no tasks");
          setListTasks(myTasks); return
        }
      } else {
        
       //Senão exibe todas as tarefas ativas da app
        const tasks = await getActiveTasks(tokenUser);
        setListTasks(tasks);
      }
    };
  
    fetchData();
  }, [tokenUser, filterOn, filteredTasks, showNewTask, showUserTasks, myTasks, editTask]);
  

   // Função para obter a cor com base na prioridade da tarefa
function getColorForPriority(priority) {
  if (priority === 100) {
    return 'green';
  } else if (priority === 200) {
    return 'yellow'; 
  } else if (priority === 300) {
    return 'red'; 
  } else {
    return 'grey'; 
  }
}


 // Função para apagar temporariamente uma tarefa (passa o estado de ativo para inativo)
const handleDeleteTask = async (tokenUser, taskId) => {
  try {
      const result = await softDeleteTask(tokenUser, taskId);

      if(result===200){
      NotificationManager.success("Task deleted successfully", "", 800);
      const updatedTasks = listTasks.filter((task) => task.id !== taskId);
        setListTasks(updatedTasks);
      
      }else{
        NotificationManager.warning("Error deleting task " + taskId.title);
      }
  } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
  }
  
};

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
const todoList = sortTasks(listTasks.filter(tasks => tasks.state ==='toDo'));
const doingList = sortTasks(listTasks.filter(tasks => tasks.state ==='doing'));
const doneList = sortTasks(listTasks.filter(tasks => tasks.state ==='done'));


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
    
    // Atualiza o estado local das tarefas após a mudança
    const updatedTasks = listTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, state: newState };
      }
      return task;
    });

    //Atualiza a lista de tarefas a ser exibida no scrum_board
    setListTasks(updatedTasks);

  } catch (error) {
    console.error("Failed to update task state:", error);
  }
 
};

const allowDrop = (event) => {
  event.preventDefault();
};

   
     return(
      <div>
        {showTaskDetails && <TaskDetails />}
       
      <div className="scrum_section" id="scrum_section">
        <div className="column" id="column1" >
          <div className="title">To Do</div>
          <section className="task_list" id="toDo" onDrop={(event) => handleDrop(event, tokenUser, taskId, "toDo")} onDragOver={allowDrop}>
          {todoList.map((task) => (
            <div className='task' key={task.id} draggable  onDragStart={(event) => handleDragStart(event, task.id)} onDoubleClick={()=>handleTaskDoubleClick(task.id)}>
              <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>

              <div className="task-details">
                {/* Lógica para apresentar o botoes para os diferentes tipos de utilizadores;
                 - Se for developer só aparece o botao de editar nas suas proprias tarefas e 
                 se for scrum ou product_owner aparecem todos os botoes em todas as tarefas*/}
  {(role === "developer" && showUserTasks) && (
    
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      
    </div>
  )}
  {(role === "scrum_master" || role === "product_owner") && (
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
    </div>
  )}
</div>
             
            </div>
          ))}
          </section>
          <button id="btn_task" onClick={handleNewTaskClick}>+ New Task</button>
          {showNewTask && <TaskBoard />}
        </div>
        <div className="column" id="column2" onDrop={(event) => handleDrop(event, tokenUser, taskId, "doing")} onDragOver={allowDrop}>
          <div className="title">Doing</div>
          <section className="task_list" id="doing">
          {doingList.map((task) => (
              <div className='task' key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)} onDoubleClick={()=>handleTaskDoubleClick(task.id)}>
                  <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              <div className="task-details">
  {(role === "developer" && showUserTasks) && (
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      {(role !== "scrum_master" && role !== "product_owner") && (
        <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
      )}
    </div>
  )}
  {(role === "scrum_master" || role === "product_owner") && (
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
    </div>
  )}
</div>
           
              </div>
            ))}
           
          </section>
        </div>
        <div className="column" id="column3" onDrop={(event) => handleDrop(event, tokenUser, taskId, "done")} onDragOver={allowDrop}>
          <div className="title">Done</div>
          <section className="task_list" id="done">
          {doneList.map((task) => (
              <div className='task' key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)} onDoubleClick={()=>handleTaskDoubleClick(task.id)}>
                  <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              
              <div className="task-details">
  {(role === "developer" && showUserTasks) && (
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      {(role !== "scrum_master" && role !== "product_owner") && (
        <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
      )}
    </div>
  )}
  {(role === "scrum_master" || role === "product_owner") && (
    <div className='buttons_scrum'>
      <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button> 
      <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
    </div>
  )}
</div>
            
              </div>
            ))}
          
          </section>
        </div>
      </div>
  
    </div>
 
     )
 }

 export default ScrumBoard;
import React from "react";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { softDeleteTask } from "../endpoints/tasks";
import { NotificationManager } from "react-notifications";


function Task({
  task,
  role,
  showUserTasks,
  tokenUser,
  handleDragStart,
  handleEdit,
  handleTaskDoubleClick

  
}) {


// Função para apagar temporariamente uma tarefa (passa o estado de ativo para inativo)
const handleDeleteTask = async (tokenUser, taskId) => {

  try {
    const result = await softDeleteTask(tokenUser, taskId);

    if (result === 200) {
      NotificationManager.success("Task deleted successfully", "", 800);
    } else {
      NotificationManager.warning("Error deleting task " + taskId.title);
    }
  } catch (error) {
    console.error("Erro ao excluir a tarefa:", error);
  }
};

  // Função para obter a cor com base na prioridade da tarefa
  const getColorForPriority = (priority) => {
    if (priority === 100) {
      return "green";
    } else if (priority === 200) {
      return "yellow";
    } else if (priority === 300) {
      return "red";
    } else {
      return "grey";
    }
  };

  return (
    <div
      className="task"
      key={task.id}
      draggable
      onDragStart={(event) => handleDragStart(event, task.id)}
      onDoubleClick={() => handleTaskDoubleClick(task.id)}
    >
      <div
        className="priority-bar"
        style={{
          backgroundColor: getColorForPriority(task.priority),
        }}
      ></div>
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        <div className="task-author">{task.author.username}</div>
        <div className="task-category">{task.category.title}</div>
      </div>

      <div className="task-details">
        {role === "developer" && showUserTasks && (
          <div className="buttons_scrum">
            <button
              className="delete_btnS"
              onClick={() => handleEdit(task.id)}
            >
              <MdModeEditOutline />
            </button>
          </div>
        )}
        {(role === "scrum_master" || role === "product_owner") && (
          <div className="buttons_scrum">
            <button
              className="delete_btnS"
              onClick={() => handleEdit(task.id)}
            >
              <MdModeEditOutline />
            </button>
            <button
              className="task_btnS"
              onClick={() => handleDeleteTask(tokenUser, task.id)}
            >
              <MdDelete />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Task;

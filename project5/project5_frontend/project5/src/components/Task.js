import React from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import '../format/ScrumBoard.css';

function Task({ task, handleEdit, handleDeleteTask, role, showUserTasks, tokenUser }) {
  return (
    <div>
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        <div className="task-author">{task.author.username}</div>
        <div className="task-category">{task.category.title}</div>
      </div>
      <div className="task-details">
        {(role === "developer" && showUserTasks) && (
          <div className='buttons_scrum'>
            <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline /></button>
          </div>
        )}
        {(role === "scrum_master" || role === "product_owner") && (
          <div className='buttons_scrum'>
            <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline /></button>
            <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete /></button>
          </div>
        )}
      </div>
      </div>
  )
}

export default Task;

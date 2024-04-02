import {userStore} from "../stores/UserStore";
import { useState, useEffect } from "react";
import { countTasks } from "../endpoints/tasks";
import { getUserByToken } from "../endpoints/users";
import { NotificationManager } from "react-notifications";
import { showModal } from "../stores/boardStore";

function TotalTasks() {
  // Obtém o token do usuário do store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;


   //Obtemo username guardado da store do user ao qual vamos alterar o perfil
   const { getUsername } = userStore();
   const username = getUsername();


    //Estado para controlar a visibilidade do modal de edição de user
    const { showModalEditUser } = showModal();


  // Estado para armazenar as informações das tarefas do usuário
  const [taskSummary, setTaskSummary] = useState({
    tasksByState: {
      todo: 0,
      doing: 0,
      done: 0,
    },
  });

  // Efeito para obter informações do user
  useEffect(() => {
    const fetchData = async () => {

        if(showModalEditUser) {

            const tasks = await countTasks(tokenUser, username);
            setTaskSummary(tasks);
        }else{
      const result = await getUserByToken(tokenUser);

      const tasks = await countTasks(tokenUser, result.username);
      if (tasks) {
        setTaskSummary(tasks);
      } else {
        NotificationManager.error("Failed to fetch task data", "", 800);
      }
    }
    };
    fetchData();
  }, [tokenUser, username, showModalEditUser]);

  return (
<div>
         <div className='tasksData'>
        <h2>Task Overview</h2>
        <label className="descriptioLabel">Total Tasks</label>
        <input
          type="text"
          className="edit_element"
          placeholder={taskSummary.todo + taskSummary.doing + taskSummary.done}
          readOnly
        />
  
      <p>Tasks by State:</p>
      <label className="descriptioLabel">TODO</label>
      <input
        type="text"
        className="edit_element"
        placeholder={taskSummary.todo}
        readOnly
      />
      <label className="descriptioLabel">DOING</label>
      <input
        type="text"
        className="edit_element"
        placeholder={taskSummary.doing}
        readOnly
      />
      <label className="descriptioLabel">DONE</label>
      <input
        type="text"
        className="edit_element"
        placeholder={taskSummary.done}
        readOnly
      />
    </div>
    </div>
      
  );
}

export default TotalTasks;

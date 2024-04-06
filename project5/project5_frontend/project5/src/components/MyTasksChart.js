import {userStore} from "../stores/UserStore";
import { useState, useEffect } from "react";
import { countTasks } from "../endpoints/tasks";
import { getUserByToken } from "../endpoints/users";
import { NotificationManager } from "react-notifications";
import { showModal } from "../stores/boardStore";
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';


function MyTasksChart() {
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

// Calcular o total de tarefas
const totalTasks = taskSummary.todo + taskSummary.done + taskSummary.doing;
// Dados de exemplo
const data = [
  {name: 'TODO', value: taskSummary.todo},
  {name: 'DOING', value: taskSummary.doing},
  {name: 'DONE', value: taskSummary.done},
];

// Cores para cada seção do gráfico de rosca
const COLORS = ['#007BFF', '#00B2FF', '#33C7FF'];

  return (
   <div className="verify-container" >
         <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          labelLine={false}
          outerRadius={80}
          innerRadius={50}
          fill="#8884d8"
          dataKey="value"
         
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Text x={200} y={100} textAnchor="middle" dominantBaseline="middle">
          {totalTasks}
        </Text>
        <Tooltip />
        <Legend 
          layout="vertical"
          align="right"
          verticalAlign="middle"/>
        </PieChart>
        
        <div>
      
        </div>
 
 </div>
  );
}

export default MyTasksChart;

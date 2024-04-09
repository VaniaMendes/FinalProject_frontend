import {userStore} from "../stores/UserStore";
import { useState, useEffect } from "react";
import { countTasks } from "../endpoints/tasks";
import { getUserByToken } from "../endpoints/users";
import { NotificationManager } from "react-notifications";
import { showModal } from "../stores/boardStore";
import { PieChart, Pie, Cell, Tooltip, Legend, Text } from 'recharts';
import {showChart} from '../stores/boardStore';
import {RiCloseFill} from 'react-icons/ri';
import { useParams } from "react-router-dom";


function MyTasksChart() {
  // Obtém o token do usuário do store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  const {showTaskChart, setShowTaskChart} = showChart();

const{username} = useParams();

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

  

  const handleBack = () => {
    setShowTaskChart(false);
  };

// Calcular o total de tarefas
const totalTasks = taskSummary.todo + taskSummary.done + taskSummary.doing;
// Dados de exemplo
const data = [
  {name: 'TODO', value: taskSummary.todo},
  {name: 'DOING', value: taskSummary.doing},
  {name: 'DONE', value: taskSummary.done},
];

// Cores para cada seção do gráfico 
const COLORS = ['#8FBC8F', '#ADD8E6', '#FFB6C1'];

  return (
   <div className="verify-container" >
    <button className="close" onClick={handleBack}><RiCloseFill /></button>


         <PieChart width={400} height={400}>
         <text fontSize={30} x={200} y={20} textAnchor="middle" dominantBaseline="middle">Tasks for State</text>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
         
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Text x={100} y={150} textAnchor="left" dominantBaseline="middle">
          {totalTasks}
        </Text>
        <Tooltip />
        <Legend 
        layout="horizontal"
        align="left"
        horizAdvXAlign="middle"
       width={150}
       height={50}
       fontSize={5}
       margin={{ top: 20, left: 20, right: 10, bottom: 20 }}
        formatter={(name, entry) => {
          return `${name} (${entry.payload.value})`; 
          }}/> 
        
   
        </PieChart>
        
        <div>      
        </div>
 
 </div>
  );
}

export default MyTasksChart;

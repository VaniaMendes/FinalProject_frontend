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
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function MyTasksChart() {
  // Obtém o token do usuário do store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  

     //Obtem a linguagem de exibição da página
     const locale = userStore((state) => state.locale);

  const { setShowTaskChart} = showChart();

const{username} = useParams();

    //Estado para controlar a visibilidade do modal de edição de user
    const { showModalEditUser } = showModal();


  // Estado para armazenar as informações das tarefas do usuário
  const [taskSummary, setTaskSummary] = useState({
    tasksByState: {
      toDo: 0,
      doing: 0,
      done: 0,
    },
  });

  // Efeito para obter informações do user
  useEffect(() => {
    const fetchData = async () => {

      //Se for no modal da tabela de utilizadores temos de ir buscra o user pelo username
        if(showModalEditUser) {
            const tasks = await countTasks(tokenUser, username);
            setTaskSummary(tasks);
        }else{

          //Se estiver na pagina de perfil do proprio vai buscar o total de tasks do proprio pelo token
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


// Dados de exemplo
const data = [
  {name: 'TODO', value: taskSummary.toDo},
  {name: 'DOING', value: taskSummary.doing},
  {name: 'DONE', value: taskSummary.done},
];

// Cores para cada seção do gráfico 
const COLORS = ['#8FBC8F', '#ADD8E6', '#FFB6C1'];

  return (
   <div className="verify-container" >
    <IntlProvider locale={locale} messages={languages[locale]}>
    <div className = "tasks-header">
    <button className="close" onClick={handleBack}><RiCloseFill /></button>
    

    <FormattedMessage id="tasksForState">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                      </div>

                      <div className="chat-body">
         <PieChart width={400} height={400}>
         <text fontSize={30} x={200} y={20} textAnchor="middle" dominantBaseline="middle"> </text>
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
        </div>
        <div>      
        </div>
 </IntlProvider>
 </div>
  );
}

export default MyTasksChart;

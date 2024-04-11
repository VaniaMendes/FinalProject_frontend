import React, { useEffect, useState } from "react";
import MainPage from "../components/MainPage";
import SideMenu from "../components/SideMenu";
import MenuProductOwner from "../components/MenuProductOwner";
import "../format/dashboard.css";
import { getDashboard } from "../endpoints/users";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { userStore } from "../stores/UserStore";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

function Dashboard() {
  //Vai buscar o token à store
  const tokenUser = userStore((state) => state.token.token);
  const [data, setData] = useState({});
  const [userBytime, setUserByTime] = useState("");
  const [tasksConcluedByTime, setTasksConcluedByTime] = useState("");
  const [tasksByState, setTasksByState] = useState([]);

   //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboard(tokenUser);
        setData(result);

        // Transforma os dados em um array de objetos com chave 'date' e 'users'
        const userByTimeData = Object.entries(
          result.countUsersByRegistrationDate
        ).map(([date, users]) => ({ date, users }));
        setUserByTime(userByTimeData);

        // Transforma os dados em um array de objetos com chave 'date' e 'tasks'
        const tasksConcluedByTimeData = Object.entries(
          result.countTaksByConclusionDate
        ).map(([date, tasks]) => ({ date, tasks }));
        setTasksConcluedByTime(tasksConcluedByTimeData);

        let tasksByState = [];
        if (result.countTasksByState) {
          tasksByState = Object.entries(result.countTasksByState).map(
            ([state, tasks]) => ({ state, tasks })
          );
        }
        setTasksByState(tasksByState);
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      }
    };
    fetchData();
  }, [tokenUser]);

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <div>
      <IntlProvider locale={locale} messages={languages[locale]}>
      <MainPage />
      <SideMenu />
      <MenuProductOwner />
      <div className="dashboard">
        <div className="dashboard_container1">
        <text className = "title_dashboard"  x={250} y={20} textAnchor="middle" fontSize="20px"><FormattedMessage id="registerUsersByTime">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></text> {/* Título */}
          <LineChart
          
            width={500}
            height={300}
            data={userBytime}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
           
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend   
            
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        <div className="dashboard_container2">
        <text className = "title_dashboard" x={250} y={20} textAnchor="middle" fontSize="20px"><FormattedMessage id="tasksFinished/Time">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></text> {/* Título */}
          <BarChart 
            width={500}
            height={300}
            data={tasksConcluedByTime}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
             
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </div>

        
        <div className="dashboard_container3">
          <PieChart width={400} height={400}>
          <text className = "title_dashboard" x={200} y={80} textAnchor="middle" fontSize="20px"><FormattedMessage id="tasksForState">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></text> {/* Título */}
            <Pie
              data={tasksByState}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={90}
              fill="#8884d8"
              dataKey="tasks"
            >
              {tasksByState.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={(value, entry, index) => {
                    const status = ["Todo", "Doing", "Done"];
                    const taskCount = entry.payload.tasks; // Obtém o número de tarefas
                    return `${status[index]} (${taskCount})`; // Adiciona o número de tarefas entre parênteses ao lado do nome
                  }}
          />
          </PieChart>
        </div>
        <div className="dashboard_container4">
        <div>
  <ul>
    <li><FormattedMessage id="totalUsers">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> {data.totalUsers}</li>
    <li><FormattedMessage id="confirmedUsers">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> {data.confirmedUsers}</li>
    <li><FormattedMessage id="unconfirmedUsers">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> {data.unconfirmedUsers}</li>
    <li><FormattedMessage id="averageTasks/User">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> {data.averageTasksPerUser ? data.averageTasksPerUser.toFixed(2) : 'N/A'}</li>
    <li><FormattedMessage id="averageTaskConclusion/Time">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> {data.averageTaskCompletionTime ? data.averageTaskCompletionTime.toFixed(2) : 'N/A'}</li>

  </ul>
</div>
       
        <div className="dashboard_container5">
        
  <table className="tableDashboard">
    <thead>
      
      <tr>
        <th><FormattedMessage id="category">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
        <th><FormattedMessage id="taskcount">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
      </tr>
    </thead>
    <tbody>
    {data.mostFrequentCategories && Object.entries(data.mostFrequentCategories).map(([category, taskCount]) => (
        <tr key={category}>
          <td>{category}</td>
          <td>{taskCount}</td>
        </tr>
      ))}
    </tbody>
  </table>

        </div>
        
      </div>
    </div>
    </IntlProvider>
    </div>
  );
}

export default Dashboard;

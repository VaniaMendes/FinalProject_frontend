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

function Dashboard() {
  //Vai buscar o token à store
  const tokenUser = userStore((state) => state.token.token);
  const [data, setData] = useState({});
  const [userBytime, setUserByTime] = useState("");
  const [tasksConcluedByTime, setTasksConcluedByTime] = useState("");
  const [tasksByState, setTasksByState] = useState([]);

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
      <MainPage />
      <SideMenu />
      <MenuProductOwner />
      <div className="dashboard">
        <div className="dashboard_container1">
        <text className = "title_dashboard"  x={250} y={20} textAnchor="middle" fontSize="20px">Registered Users/Time</text> {/* Título */}
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
        <text className = "title_dashboard" x={250} y={20} textAnchor="middle" fontSize="20px">Tasks finished/Time</text> {/* Título */}
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
          <text className = "title_dashboard" x={200} y={80} textAnchor="middle" fontSize="20px">Tasks by State</text> {/* Título */}
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
    <li>Total Users: {data.totalUsers}</li>
    <li>Confirmed Users: {data.confirmedUsers}</li>
    <li>Unconfirmed Users: {data.unconfirmedUsers}</li>
    <li>Average Tasks/User: {data.averageTasksPerUser ? data.averageTasksPerUser.toFixed(2) : 'N/A'}</li>
    <li>Average Time Conclusion/Time: {data.averageTaskCompletionTime ? data.averageTaskCompletionTime.toFixed(2) : 'N/A'}</li>

  </ul>
</div>
       

        <div className="dashboard_container5">
        
  <table className="tableDashboard">
    <thead>
      
      <tr>
        <th>Category</th>
        <th>Task Count</th>
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
    </div>
  );
}

export default Dashboard;

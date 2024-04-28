import React from 'react';

import { FaChartPie } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {showChart} from '../stores/boardStore';
import MyTasksChart from './MyTasksChart';
import { showMessages } from "../stores/boardStore";
import Chat from './Chat';
import {useParams} from 'react-router-dom'

   
function ButtonsForProfile(){

    //Componente que mostra os dois botoes presentes no painel de perfil para consulta do grafico de tasks e do chat


    //Estado para mostrar o comoponente do grafico de tasks
    const {showTaskChart, setShowTaskChart} = showChart();

    //Estado para mostrar o comoponente do chat
    const { showMessageChat, setShowMessageChat } = showMessages();

    //Estado para ir buscar o username ao url da pagina para saber se mostro ou nao o botao de chat
    //Porque o botao de chat não aparece quando o user está no próprio perfil
    const {username} = useParams();
 

    //Função para mostrar o grafico de tasks
    const handleShowChart = () => {
        setShowTaskChart(true);
    }

    //Função para mostrar o chat
    const handleChat= () =>{
        setShowMessageChat(true);
    }
 
    return(
        <div>
            {showTaskChart && <MyTasksChart/>}
            {showMessageChat && <Chat/>}
            <div className="icon_profile">
           <button className = "icon_profile_button"  onClick={handleShowChart}><FaChartPie title="Tasks"/></button>
           {username !== undefined  &&  (
           <button className = "icon_profile_button" title="Chat" onClick={handleChat}><IoChatbubbleEllipses title="Chat"/></button>)}
           </div>
        </div>
    )
}

export default ButtonsForProfile;
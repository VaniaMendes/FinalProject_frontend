import React, { useState, useEffect } from 'react';

import { FaChartPie } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {showChart} from '../stores/boardStore';
import MyTasksChart from './MyTasksChart';
import { showMessages } from "../stores/boardStore";
import Chat from './Chat';
import {useParams} from 'react-router-dom'

   
function ButtonsForProfile(){



    const {showTaskChart, setShowTaskChart} = showChart();

    const { showMessageChat, setShowMessageChat } = showMessages();
    const {username} = useParams();
 
    const handleShowChart = () => {
        setShowTaskChart(true);
    }

    const handleChat= () =>{
        setShowMessageChat(true);
    }
 
    return(
        <div>
            {showTaskChart && <MyTasksChart/>}
            {showMessageChat && <Chat/>}
            <div className="icon_profile">
           <button className = "icon_profile_button" title="Tasks" onClick={handleShowChart}><FaChartPie/></button>
           {username !== undefined  &&  (
           <button className = "icon_profile_button" title="Chat" onClick={handleChat}><IoChatbubbleEllipses/></button>)}
           </div>
        </div>
    )
}

export default ButtonsForProfile;
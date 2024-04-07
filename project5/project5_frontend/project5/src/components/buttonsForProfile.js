import React from 'react';

import { FaChartPie } from "react-icons/fa";
import { IoChatbubbleEllipses } from "react-icons/io5";
import {showChart} from '../stores/boardStore';
import MyTasksChart from './MyTasksChart';

function ButtonsForProfile(){

    const {showTaskChart, setShowTaskChart} = showChart();

    const handleShowChart = () => {
        setShowTaskChart(true);
    }
     // Estilos condicionais
     const editContainerStyles = showTaskChart ? {
        zIndex: 9998,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    } : {};

    return(
        <div>
            {showTaskChart && <MyTasksChart/>}
            <div className="icon_profile">
           <button className = "icon_profile_button" onClick={handleShowChart}><FaChartPie/></button>
           <button className = "icon_profile_button"><IoChatbubbleEllipses/></button>
           </div>
        </div>
    )
}

export default ButtonsForProfile;
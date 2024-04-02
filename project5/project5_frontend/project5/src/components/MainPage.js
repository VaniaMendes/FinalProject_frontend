import React from 'react';
import {userStore} from '../stores/UserStore';
import WebSocketClient from "../components/websocket"; 

function HomePage() {


  const notifications = userStore((state) => state.notifications); 
  WebSocketClient(); 
   
  return (
    
    <div id="login_body">
      <div id="body_color">
      <h2>Notifications</h2> 
<p>You have {notifications.length} notifications</p>
      </div>
      <div id="aside_color"></div>
      <header>
        <h1 id="page-logo">
          <img src={"/scrum_image.png"} id="scrum_img" alt="App logo" />&nbsp;AgileUp
        </h1>
      </header>
      
      <div className="footer">
        <div>Powered by:</div>
        <ul>
          <li>Vânia Mendes</li>
        </ul>
        <br />
        <p>© Acertar o Rumo 2024</p>
      </div>
    </div>
  );
}

export default HomePage;

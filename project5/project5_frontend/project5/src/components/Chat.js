import React, { useEffect } from "react";

import { showMessages } from "../stores/boardStore";
import { RiSendPlaneFill } from "react-icons/ri";
import { sendMessage } from "../endpoints/messages";
import {userStore} from '../stores/UserStore';
import {useState} from 'react'
import { NotificationManager } from "react-notifications";


function Chat(){

    // Obtém o token do user
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;

    //Obtemo username guardado da store do user ao qual vamos alterar o perfil
    const { getUsername } = userStore();
    const username = getUsername();
  

    console.log(tokenUser+ "username" + username);

    const { showMessageChat } = showMessages();

    const [content, setContent] = useState(''); // Estado para armazenar o valor do input

    // Função para lidar com a alteração do input
    const handleInputChange = (event) => {
        setContent(event.target.value); // Atualiza o estado 'content' com o valor digitado no input
    };

    const message = {
        content:content,
       
    receiver: {
        username: username
    }
        
    }


    const handleSendMessage =async ()=>{
        const result = await sendMessage(tokenUser, message);
        if(result){
            NotificationManager.success("Message sent successfully", "Success", 1000);
        }  
        else{
            NotificationManager.error("Failed to send message", "Error", 1000);
        }
    }

    return(
        <div>
            <div className="verify-container">
                <div className="chat-container">
                    <div className="chat-header">
                        <div className="chat-header-title">
                            <h1>Chat</h1>
                        </div>
                    </div>
                    <div className="chat-body">
                       
                    </div>
                    <div className="chat-footer">
                        <input type="text" placeholder="Send your message" value={content} onChange={handleInputChange} />
                        <button onClick={handleSendMessage}><RiSendPlaneFill/></button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
import React, { useEffect } from "react";

import { showMessages } from "../stores/boardStore";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";
import { getMessagesBetweenUsers, sendMessage } from "../endpoints/messages";
import { userStore } from "../stores/UserStore";
import { useState } from "react";
import { getUserByUsername } from "../endpoints/users";
import { useParams } from "react-router-dom";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

function Chat() {
  // Obtém o token do user
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Obtem o username guardado da store do user ao qual vamos alterar o perfil
  const { username } = useParams();

  const { showMessageChat, setShowMessageChat } = showMessages();

  //Adicionar uma nova instancia do websocket
  const [ws, setWs] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState("");

  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);

  const [photo, setPhoto] = useState("");


  const [content, setContent] = useState(""); // Estado para armazenar o valor do input
  const [messages, setMessages] = useState([]); // Estado para armazenar as mensagens


  const { addNotification } = userStore.getState();

  const message = {
    content: content,

    receiver: {
      username: username,
    },
  };

  const fetchData = async () => {
    try {
      const result = await getMessagesBetweenUsers(tokenUser, username);
      const user = await getUserByUsername(tokenUser, username);
      setPhoto(user.imgURL);
      setMessages(result); // Define as informações do user
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
    }
  };

  useEffect(() => {
    const WS_URL = "ws://localhost:8080/project_backend/websocket/message/";
    const websocket = new WebSocket(WS_URL + tokenUser);
    websocket.onopen = () => {
      console.log("WebSocket connection for chat messages is open");
      
      // Após a conexão WebSocket ser aberta, chama a função fetchData
      fetchData();
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("A new message is received!");
      console.log(message);
      setMessages(prevMessages => [...prevMessages, message]);
     
    };

    return () => {
      websocket.close();
    };

   
}, [tokenUser, username]);

  // Função para lidar com a alteração do input
  const handleInputChange = (event) => {
    setContent(event.target.value); // Atualiza o estado 'content' com o valor digitado no input
  };


  const handleSendMessage = async () => {
    if (message.content.trim() !== "") {
      const result = await sendMessage(tokenUser, message);
      if(result){
        setContent("");
        
      }
    }

  };

  const closeChat = () => {
    setShowMessageChat(false);
  };

  return (
    <IntlProvider locale={locale} messages={languages[locale]}>
      <div className="chat_container">
        <div className="chat-header">
          <div className="chat-header-title">
            <button className="close" onClick={closeChat}>
              <RiCloseFill />
            </button>
            <h1>
              <FormattedMessage id="chat">
                {(message) => <span>{message}</span>}
              </FormattedMessage>
            </h1>
          </div>
        </div>
        <div className="chat-body">
          {messages &&
            messages.map((msg, index) => {
              const isReceiver = msg.receiver.username === username;
            
              return (
                <div
                  key={index}
                  className={`chat-message ${
                    isReceiver ? "chat-message-sender" : "chat-message-receiver"
                  }`}
                >
                  <div className="chat-message-info">
                    <div className="photo-receiver">
                      <div>
                        {" "}
                        <img
                          id="photo-msg"
                          src={isReceiver && msg.sender  ? msg.sender.imgURL : photo}
                          alt="user.png"
                        />{" "}
                      </div>
                      <div className="chat-message-info-username">
                        {isReceiver && msg.sender ? msg.sender.username : username}
                      </div>
                    </div>

                    <div className="chat-message-info-time">
                      {msg.timestamp}
                    </div>
                    <div className="chat-message-content">{msg.content}</div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="chat-footer">
          <div className="input-container">
          <FormattedMessage id="sendYourMessage">
      {(message) => 
        <input
          type="text"
          placeholder={message}
          value={content}
          onChange={handleInputChange}
        />
      }
    </FormattedMessage>
            <button className="btn-send" onClick={handleSendMessage}>
              <RiSendPlaneFill />
            </button>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
}

export default Chat;

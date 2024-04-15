import { useEffect } from "react";
import { userStore } from "../stores/UserStore";
import {notificationStore} from '../stores/NotificationStore';
function WebSocketClient() {
  const { addNotification } = notificationStore.getState();

  //Obtem o token da store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;



  const WS_URL = "ws://localhost:8080/project_backend/websocket/notifier/";

  useEffect(() => {
    const websocket = new WebSocket(WS_URL + tokenUser);
    websocket.onopen = () => {
      console.log("The websocket connection is open");
    };

    websocket.onmessage = (event) => {
      const notification = event.data;
      console.log("a new notification is received!");
      addNotification(notification);

     
    };
  }, [addNotification]);
}
export default WebSocketClient;

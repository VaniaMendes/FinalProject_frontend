import { useEffect } from "react";
import { userStore } from "../stores/UserStore";
function WebSocketClient() {
  const { addNotification } = userStore.getState();

  const WS_URL = "ws://localhost:8080/project_backend/websocket/notifier/";

  useEffect(() => {
    const websocket = new WebSocket(WS_URL + "mytoken");
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

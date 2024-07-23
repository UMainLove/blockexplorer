//Setup WebSocket Connection to avoid CORS error in React 
import { useEffect } from 'react';

function useWebSocket(url, onMessage) {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      onMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);

  return null;
}

export default useWebSocket;

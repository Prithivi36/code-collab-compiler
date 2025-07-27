import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;

export const connectSocket = (roomId, onMessage) => {
  const socket = new SockJS('https://comp.back.6thdegree.app/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
      const msg = JSON.parse(message.body);
      onMessage(msg);
    });
  });
};

export const sendCode = (roomId, userId, content) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.send(`/app/room/${roomId}/edit`, {}, JSON.stringify({
    userId,
    roomId,
    content,
    timestamp: Date.now()
  }));
};

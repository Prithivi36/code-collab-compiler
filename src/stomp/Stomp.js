import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let currentSubscription = null

export const connectSocket = (roomId, onMessage) => {
  const socket = new SockJS('https://comp.back.6thdegree.app/ws');
  // const socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    if(currentSubscription){
      currentSubscription.unsubscribe();
    }
    currentSubscription=stompClient.subscribe(`/topic/room/${roomId}`, (message) => {
      const msg = JSON.parse(message.body);
      onMessage(msg);
    });
    stompClient.send(`/app/room/${roomId}/sync`, {},{})
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

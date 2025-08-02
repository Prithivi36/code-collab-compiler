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
let userStomp = null;
export function connectUserSocket(roomId,name,onMessage){
  const socket = new SockJS("https://comp.back.6thdegree.app/ws")
  // const socket = new SockJS('http://localhost:8080/ws');
    userStomp = Stomp.over(socket)

    userStomp.connect({},()=>{
      userStomp.subscribe(`/topic/room/users/${roomId}`,(m)=>{
        const msg = JSON.parse(m.body)
        onMessage(msg);
        sessionStorage.setItem('users',JSON.stringify(msg))
      })
      userStomp.send(`/app/room/${roomId}/users/${name}`, {});

    })
}
export const sendCode = (roomId, userId, content) => {
  if (!stompClient || !stompClient.connected) return;

  stompClient.send(`/app/room/${roomId}/edit`, {}, JSON.stringify({
    userId,
    roomId,
    content,
    timestamp: Date.now()
  }));
};

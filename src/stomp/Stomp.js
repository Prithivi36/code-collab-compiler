import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let currentSubscription = null
const BASE_URL ='https://comp.back.6thdegree.app/ws'
// const BASE_URL ='http://localhost:8080/ws'
export const connectSocket = (roomId, onMessage) => {
  const socket = new SockJS(BASE_URL);
  stompClient = Stomp.over(socket);
  stompClient.debug=()=>{}
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
  const socket = new SockJS(BASE_URL)
    userStomp = Stomp.over(socket)
    userStomp.debug = () => {};

    userStomp.connect({},()=>{
      userStomp.subscribe(`/topic/room/users/${roomId}`,(m)=>{
        const msg = JSON.parse(m.body)
        onMessage(msg);
        sessionStorage.setItem('users',JSON.stringify(msg))
      })
      userStomp.send(`/app/room/${roomId}/users/${name}`, {});

    })
}
let notepadClient =null;
export function connectNotepadSocket(roomId,onMessage){
  const socket = new SockJS(BASE_URL)
  notepadClient=Stomp.over(socket)
  notepadClient.debug=()=>{}
    notepadClient.connect({},()=>{
      notepadClient.subscribe(`/topic/room/${roomId}/notepad`,(m)=>{
        const msg = m.body
        onMessage(msg);
        sessionStorage.setItem('notepad',msg)
      })
      notepadClient.send(`/app/room/${roomId}/sync/notepad`,{},{})
    })
}
export function sendNotes(roomId,content){
  if(!notepadClient || !notepadClient.connected )return

  notepadClient.send(`/app/room/${roomId}/notepad`,{},JSON.stringify({
    content
  }))
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

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient = null;
let currentSubscription = null
// const BASE_URL ='https://comp.back.6thdegree.app/ws'
const BASE_URL ='http://localhost:8080/ws'
export  const connectSocket = async (roomId, onMessage) => {
  const socket = new SockJS(BASE_URL);
  stompClient = Stomp.over(socket);
  stompClient.debug=()=>{}
  await stompClient.connect({}, () => {
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
export async function connectUserSocket(roomId,name,onMessage){
  const socket = new SockJS(BASE_URL)
    userStomp = Stomp.over(socket)
    userStomp.debug = () => {};

    await userStomp.connect({},()=>{
      userStomp.subscribe(`/topic/room/users/${roomId}`,(m)=>{
        const msg = JSON.parse(m.body)
        onMessage(msg);
        sessionStorage.setItem('users',JSON.stringify(msg))
      })
      userStomp.send(`/app/room/${roomId}/users/${name}`, {});

    })
}
export function deleteUser(roomId,userId){
  console.log("deleted")
  if (!userStomp || !userStomp.connected) return;
  userStomp.send(`/app/room/${roomId}/del/${userId}`)
  sessionStorage.removeItem('room')
  sessionStorage.removeItem('userId')
  sessionStorage.removeItem('agora-token')
  sessionStorage.removeItem('users')
  location.reload();

}
let notepadClient =null;
export async function connectNotepadSocket(roomId,onMessage){
  const socket = new SockJS(BASE_URL)
  notepadClient=Stomp.over(socket)
  notepadClient.debug=()=>{}
    await notepadClient.connect({},()=>{
      notepadClient.subscribe(`/topic/room/${roomId}/notepad`,(m)=>{
        const msg = JSON.parse(m.body)
        if(msg.userId!=sessionStorage.getItem('userId'))
          onMessage(msg.content);
      })
      notepadClient.send(`/app/room/${roomId}/sync/notepad`,{},{})
    })
}
export function sendNotes(roomId,content,userId){
  if(!notepadClient || !notepadClient.connected )return

  notepadClient.send(`/app/room/${roomId}/notepad`,{},JSON.stringify({
    content,
    userId
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

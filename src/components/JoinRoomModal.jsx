import axios from 'axios';
import React, { useState } from 'react';
import { connectUserSocket } from '../stomp/Stomp';

const JoinRoomModal = (props) => {
  const [roomCode, setRoomCode] = useState('');
  const [name,setName] =useState(sessionStorage.getItem('userId')||'');

  const handleJoin = () => {
    if (roomCode.trim()) {
      sessionStorage.setItem('room',roomCode)
      sessionStorage.setItem('userId',name)
      axios.get("https://comp.back.6thdegree.app:8081/rtcToken?channelName="+roomCode).then(
        res=>{
          sessionStorage.setItem('agora-token',res.data.key)
          console.log(res.data,"************************************8")
        }
        
      ).
      then(
        res=>location.reload()
      )
    }
  };

  return (
    <>
      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="joinRoomModal"
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="joinRoomModalLabel">Enter Room Code</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-3"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleJoin}
                data-bs-dismiss="modal"
              >
                Join
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default JoinRoomModal;

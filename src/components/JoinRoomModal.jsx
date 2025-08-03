import axios from 'axios';
import React, { useState } from 'react';

const JoinRoomModal = () => {
  const [roomCode, setRoomCode] = useState('');
  const [name,setName] =useState('');

  const handleJoin = () => {

    if (roomCode.trim()) {
      sessionStorage.setItem('room',roomCode)
      sessionStorage.setItem('userId',name)
      axios.get("https://comp.back.6thdegree.app:8081/rtcToken?channelName="+roomCode).then(
        res=>{
          sessionStorage.setItem('agora-token',res.data.key)
        }
      ).
      then(
        res=>location.reload()
      )
    }
  };

  return (
    <>
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

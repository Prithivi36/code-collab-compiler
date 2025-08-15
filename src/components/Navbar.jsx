import React from 'react'
import JoinRoomModal from './JoinRoomModal'
import { deleteUser } from '../stomp/Stomp'
import ManualModal from './ManualModal'
import axios from 'axios'

const Navbar = () => {
  const roomId=sessionStorage.getItem('room')
  const userId=sessionStorage.getItem('userId')

  React.useEffect(() => {

    const handleTabClose = (event) => {

      if (roomId && userId) {
        event.preventDefault();
        event.returnValue=''
      }
    };
    const handleUnload =(event)=>{
      if(roomId && userId){
        sessionStorage.clear();
        navigator.sendBeacon(`https://comp.back.6thdegree.app/delete/${roomId}/${userId}`, "{}")
      }
    }

    window.addEventListener('beforeunload', handleTabClose);
    window.addEventListener('unload',handleUnload)
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
      window.removeEventListener('unload',handleUnload)
    };
  }, [roomId, userId]);

  return (
    <div style={{position:'absolute',left:'0',right:'0',top:'0'}} className='nav py-3 bg-light text-dark d-flex align-items-center justify-content-between px-4'>
      <h3 className='fw-medium' >
        <span className='text-primary'><i className="bi bi-code-slash me-2"></i></span>
        Colider
      </h3>
      <div className="actions d-md-block">
        {roomId!=null?
          <div className="">
            <p className='m-0 p-0 fw-medium'>Room id : <span className='text-primary fw-bolder'> {roomId} </span><i style={{cursor:'pointer'}}  onClick={()=>deleteUser(roomId,userId)}  className='bi bi-box-arrow-right text-center text-danger  px-3 py-2 rounded-5 m-0 fw-bolder'></i> </p>
          </div>
          
          :
          <button className="btn btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#manual"
        >
            <i className="bi bi-people-fill me-2"></i>
            Join room</button>}
          <JoinRoomModal />
          <ManualModal />
        
      </div>
    </div>
  )
}

export default Navbar

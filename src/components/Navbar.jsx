import React from 'react'
import JoinRoomModal from './JoinRoomModal'

const Navbar = (props) => {

  return (
    <div style={{position:'absolute',left:'0',right:'0',top:'0'}} className='nav py-3 bg-white text-dark d-flex justify-content-between px-4'>
      <h3 className='fw-medium' >
        <span className='text-primary'><i className="bi bi-code-slash me-2"></i></span>
        Collider
      </h3>
      <div className="actions d-md-block">
        <button className="btn btn-outline-secondary me-2"
          data-bs-toggle="modal"
          data-bs-target="#joinRoomModal"
        >
            <i className="bi bi-people-fill me-2"></i>
            Join room</button>
          <JoinRoomModal setUsers={props.setUsers} />
        {/* <button className="btn btn-primary me-2">
            <i className="bi bi-plus-circle-fill me-2"></i>
            Create room</button> */}
      </div>
    </div>
  )
}

export default Navbar

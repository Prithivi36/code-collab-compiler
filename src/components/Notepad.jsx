import React from 'react'
import { connectNotepadSocket, sendNotes } from '../stomp/Stomp';


const Notepad = (props) => {
  console.log("rerender")
  props.comeback(true)
    const roomCode = sessionStorage.getItem('room');
    const[notes,setNotes]=React.useState('')
    React.useEffect(
        ()=>{
            if(roomCode!=null){
                connectNotepadSocket(roomCode,setNotes)
            }
        },[]
    )
    function handleChange(e){
        setNotes(e.target.value)
        sendNotes(roomCode,e.target.value,sessionStorage.getItem('userId'))
    }
  return (
    <>
      <div style={{transition:'all 0.9s ease',height:props.full?'100%':'50%'}} className="shad bg-white rounded-5 overflow-hidden">
        <div className="bg-light d-flex align-items-center justify-content-between border-bottom  p-4">
        <p className='ps-2 m-0 pb-0 fw-medium'> <i className='bi bi-journal-text text-primary me-2 fw-medium'></i>Notepad</p>
        <p style={{cursor:'pointer'}} onClick={props.setFull} className='m-0 pe-3 d-md-block d-none '><i   className={`bi ${!props.full?'bi-fullscreen':'bi-fullscreen-exit  '} m-0 p-0`}></i></p>
        </div>
        <div className="bg-white p-3 h-75">
        <textarea style={{fontFamily:'revert-layer'}} value={notes} onChange={handleChange} placeholder='Questions, Discussions, ideas and more' className='border-0 w-100 notes h-100' name="" id=""></textarea>
        </div>
    </div>
    </>
  )
}

export default Notepad

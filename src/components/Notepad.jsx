import React from 'react'
import { connectNotepadSocket, sendNotes } from '../stomp/Stomp';


const Notepad = () => {
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
      <div style={{height:'55%'}} className="shad bg-white rounded-5 overflow-hidden">
        <div className="bg-light border-bottom  p-4">
        <p className='ps-2 m-0 pb-0 fw-medium'> <i className='bi bi-journal-text text-primary me-2 fw-medium'></i>Notepad</p>
        </div>
        <div className="bg-white p-3 h-75">
        <textarea style={{fontFamily:'cursive'}} value={notes} onChange={handleChange} placeholder='Questions, Discussions, ideas and more' className='border-0 w-100 notes h-100' name="" id=""></textarea>
        </div>
    </div>
    </>
  )
}

export default Notepad

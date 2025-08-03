import React from 'react'
import Editor from './Editor'
import Info from './Info'
import Output from './Output'
import Navbar from './Navbar'
import { connectUserSocket } from '../stomp/Stomp'

const Body = () => {
    const [active,setActive]=React.useState(-1)
    const [output,setOutput]=React.useState({})
    const [users,setUsers]=React.useState(JSON.parse(sessionStorage.getItem('users'))||[])
    const [stdin,setStdIn]=React.useState("");
    React.useEffect(
      ()=>{
        if(sessionStorage.getItem('userId')!=null){
          connectUserSocket(sessionStorage.getItem('room'),sessionStorage.getItem('userId'),setUsers)
        }
      },[]
    )
    function handleChange(e){
      setStdIn(e.target.value);
    }
  return (
    <>
    <Navbar setUsers={setUsers} />
    <div style={{height:'10vh'}} className="bg-light"></div>
    <div className='d-md-flex flex-row-reverse pt-4'>
      <div style={{height:'85vh'}} className='bg-light col-md-6 px-3 pb-3 '>
        <Info active={active} setActive={setActive} users={users} />
        <Editor user={users} uid={active} op={setOutput} stdin={stdin} />
      </div>
      <div style={{height:'85vh'}} className='bg-light col-md-6  px-3 pb-3 '>
        <div style={{height:'55%'}} className="shad bg-white rounded-5 overflow-hidden">
          <div className="bg-light border-bottom  p-4">
            <p className='ps-2 m-0 pb-0 fw-medium'> <i className='bi bi-journal-text text-primary me-2 fw-medium'></i>Notepad</p>
          </div>
          <div className="bg-white p-3 h-75">
            <textarea placeholder='Questions, Discussions, ideas and more' className='border-0 w-100 notes h-100' name="" id=""></textarea>
          </div>
        </div>
        <Output output={output} handleChange={handleChange} />
      </div>
    </div>
    </>
  )
}

export default Body

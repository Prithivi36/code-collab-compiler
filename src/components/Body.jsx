import React from 'react'
import Editor from './Editor'
import Info from './Info'
import Output from './Output'
import Navbar from './Navbar'
import { connectUserSocket } from '../stomp/Stomp'
import Notepad from './Notepad'

const Body = () => {

    const [active,setActive]=React.useState(-1)
    const [output,setOutput]=React.useState({})
    const [users,setUsers]=React.useState([])
    const [stdin,setStdIn]=React.useState("");
    const [loading,setLoading]=React.useState(false);
    const [notepart,setNotepart]=React.useState(true);
    const [outpad,setOutpad]=React.useState(true);
    const [edit,setedit]=React.useState(true);

    const[editfull,setEditFull] =React.useState(false)
    React.useEffect(
      ()=>{
        if(sessionStorage.getItem('userId')!=null){
          const userId = sessionStorage.getItem('userId')
          connectUserSocket(sessionStorage.getItem('room'),userId,setUsers)
        }
      },[]
    )
    function toggleFull(){
      setedit(false)
      setEditFull(prev=>!prev)
      if(editfull==false)setedit(true)
    }
    function handleChange(e){
      setStdIn(e.target.value);
    }

  return (
    <>
    <Navbar />
    <div style={{height:'10vh'}} className="bg-light mb-3 mb-md-0"></div>
    <div  style={{height:'90vh'}}  className='d-md-flex flex-row-reverse pt-4'>
      {edit && <div style={{height:'90vh'}} className='bg-light smooth col-md  px-3 pb-3 '>
        <Info active={active} setActive={setActive} users={users} />
        <Editor full={editfull} editFull={toggleFull}  user={users} loading={loading} setLoading={setLoading} uid={active} op={setOutput} stdin={stdin} />
      </div>}
      {
        !editfull &&
        <div style={{height:'85vh'}} className='bg-light col-md px-3 pb-3 '>
          {notepart && 
          <Notepad full={!outpad} setFull={()=>setOutpad(!outpad)} comeback={setedit}/>}
          {outpad&&
          <Output full={!notepart} setFull={()=>setNotepart(!notepart)} output={output} loading={loading} setLoading={setLoading} handleChange={handleChange} />}
        </div>
      }
    </div>
    </>
  )
}

export default Body

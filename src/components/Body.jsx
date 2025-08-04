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
    React.useEffect(
      ()=>{
        if(sessionStorage.getItem('userId')!=null){
          const userId = sessionStorage.getItem('userId')
          connectUserSocket(sessionStorage.getItem('room'),userId,setUsers)
        }
      },[]
    )

    function handleChange(e){
      setStdIn(e.target.value);
    }

  return (
    <>
    <Navbar />
    <div style={{height:'10vh'}} className="bg-light"></div>
    <div className='d-md-flex flex-row-reverse pt-4'>
      <div style={{height:'85vh'}} className='bg-light col-md-6 px-3 pb-3 '>
        <Info active={active} setActive={setActive} users={users} />
        <Editor user={users} loading={loading} setLoading={setLoading} uid={active} op={setOutput} stdin={stdin} />
      </div>
      <div style={{height:'85vh'}} className='bg-light col-md-6  px-3 pb-3 '>
        <Notepad />
        <Output output={output} loading={loading} setLoading={setLoading} handleChange={handleChange} />
      </div>
    </div>
    </>
  )
}

export default Body

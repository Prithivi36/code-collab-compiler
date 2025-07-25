import React from 'react'
import Editor from './Editor'
import Info from './Info'

const Body = () => {
    const [active,setActive]=React.useState(-1)
    const [users,setUsers]=React.useState([
        'Jeeva','Gagan','Rohan'
    ])
  return (
    <div className='d-md-flex flex-row-reverse'>
      <div style={{height:'100vh'}} className='bg-light col-md-6 px-3 pb-3 main-canv'>
        <Info active={active} setActive={setActive} users={users} />
        <Editor user={users} uid={active} />
      </div>
      <div style={{height:'100vh'}} className='bg-light col-md-6  px-3 pb-3 mt-5 pt-5'>
        <div style={{height:'50%'}} className="shad bg-white rounded-5 overflow-hidden">
          <div className="bg-light border-bottom  p-4">
            <p className='ps-2 m-0 pb-0 fw-medium'> <i className='bi bi-journal-text text-primary me-2 fw-medium'></i>Notepad</p>
          </div>
          <div className="bg-white p-3 h-75">
            <textarea placeholder='Questions, Discussions, ideas and more' className='border-0 w-100 notes h-100' name="" id=""></textarea>
          </div>
        </div>
        <div style={{height:'35%'}} className="shad rounded-5 mt-3 overflow-hidden">
          <div className="bg-light border-bottom  p-4">
            <p className='ps-2 m-0 pb-0 fw-medium'> <i className='bi bi-terminal text-primary me-2 fw-medium'></i>Output</p>
          </div>
          <div className="bg-white p-3 h-75">
            <textarea value='output will be here ...' disabled className='border-0 text-black bg-white w-100 notes h-100' name="" id=""></textarea>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Body

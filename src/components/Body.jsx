import React from 'react'

const Body = () => {
    const [active,setActive]=React.useState(-1)
    const [users,setUsers]=React.useState([
        'Jeeva','Gagan','Rohan'
    ])
  return (
    <div style={{height:'100vh'}} className='bg-light px-3 pb-3 main'>
      <h5 className='fw-medium'><i className="bi bi-person me-2 text-primary "></i> Collaborator (12) </h5>
      <div onClick={()=>setActive(-1)} style={{display:'inline-block'}}  className={`rounded-5 me-2 btn ${active===-1?'btn-primary':'btn-outline-secondary'}`}>
        <p  className="m-0 fw-normal ">My Code</p>
      </div>
      {
        users.map((u,i)=>{
            return(
                <div key={i} onClick={()=>setActive(i)} style={{display:'inline-block'}}  className={`rounded-5 ps-2 me-2 btn ${active===i?'btn-primary':'btn-outline-secondary'}`}>
                    <p  className="m-0 fw-normal "><div style={{height:'25px',width:'25px'}} className="rounded-5 text-light d-inline-block me-2 bg-primary">{u[0]}</div>{u}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default Body

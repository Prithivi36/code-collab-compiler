import React from 'react'

const Info = (props) => {
  
  return (
    <>
    <h5 className='fw-medium'><i className="bi bi-person me-2 text-primary "></i> Collaborator ({props.users.length}) </h5>
    <div className="d-flex flex-nowrap overflow-scroll  hide-scroll">
      <div onClick={()=>props.setActive(-1)}   className={`rounded-5 me-2 btn ${props.active===-1?'btn-primary':'btn-outline-secondary'}`}>
        <p  className="m-0 fw-normal text-nowrap ">My Code</p>
      </div>
      {
        props.users.map((u,i)=>{
            return(
                <div key={i} onClick={()=>props.setActive(i)} style={{display:'inline-block'}}  className={`rounded-5 mt-2 mt-md-0 ps-2 me-2 btn ${props.active===i?'btn-primary':'btn-outline-secondary'}`}>
                    <p  className="m-0 fw-normal text-nowrap "><div style={{height:'25px',width:'25px'}} className="rounded-5 text-light d-inline-block me-2 bg-primary">{u[0]}</div>{u}</p>
                </div>
            )
        })
      }
    </div>
    </>
  )
}

export default Info

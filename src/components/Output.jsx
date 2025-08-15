import React from 'react'

const Output = (props) => {
    const [inp,setInp]=React.useState(false);
  return (
    <>
      <div style={{transition:'all 0.9s ease',height:props.full?'100%':'50%'}} className="shad rounded-5 mt-3 bg-white overflow-hidden">
          <div className="bg-light border-bottom d-flex align-items-center justify-content-between  p-4">
            <div className="d-flex gap-3">
              <p style={{cursor:'pointer'}} onClick={()=>setInp(false)} className={`${inp?'':'text-primary'} ps-2 m-0 pb-0 fw-medium`}> <i className='bi bi-terminal text-primary me-2 fw-medium'></i>Output</p>
              <div className="">|</div>
              <p style={{cursor:'pointer'}} onClick={()=>setInp(true)}  className={`${inp?'text-primary':''} ps-2 m-0 pb-0 fw-medium`}> <i className='bi bi-input-cursor text-primary me-2 fw-bolder'></i>Input</p>
            </div>
            <p style={{cursor:'pointer'}} onClick={props.setFull} className='m-0 pe-3 d-md-block d-none '><i   className={`bi ${!props.full?'bi-fullscreen':'bi-fullscreen-exit  '} m-0 p-0`}></i></p>
          </div>
          {!inp&&<div className="bg-white p-3 h-75">
           {props.output.code!=null &&   <div className="">
                {props.output.code==0?<p className='m-0 text-success fw-bolder'>Compilation Successful</p>:<p className='m-0 text-danger fw-bolder'>{props.output.code==1?'Compilation':'Runtime'} Error</p>}
              </div>}
            <textarea style={{fontFamily:'monospace'}} placeholder={props.loading?'compiling .....':'Run to see output'} value={props.loading?"compiling ....":props.output.output||""} disabled className={`${props.output.code==1?'text-danger ':'text-black fw-normal '}border-0  bg-white w-100 notes h-100`} name="" id=""></textarea>
          </div>}
          {inp&&<div className="bg-white p-3 h-75">
            <textarea style={{fontFamily:'monospace'}}  onChange={props.handleChange} placeholder='type your input here'  className='border-0 text-black bg-white w-100 notes h-100' name="" id=""></textarea>
          </div>}
        </div>
    </>
  )
}

export default Output

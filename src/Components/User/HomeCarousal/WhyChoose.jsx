import React from 'react'
// import img from '../../../assets/img.jpg'
import img from "../../../assets/user.jpeg";

import './WhyChoose.css'


function WhyChoose() {
  return (
    <div className='outside'>
        <div className='black-portion'>
           <div className='left-side'
        style={{
          backgroundImage: `url(${img})`,
          // height: "400px",
          // width:"600px", 
          // margin:"30px",
          // paddingTop:"60px"
        
          // marginLeft:"-130px"
        }}
      ></div>

      <div className='right-side'>
        <h3 style={{padding:"40px",textAlign:"center"}}>We value your precious time</h3>
        <h5 style={{textAlign:"center"}}>
         
"Time is the currency of life; spend it wisely."</h5>
      </div>
      

        </div>
    </div>
  )
}

export default WhyChoose
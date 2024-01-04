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
        }}
      ></div>

      <div className='right-side'>
        <h3 style={{padding:"40px",textAlign:"center"}}>We value your precious time</h3>
        <h6 style={{textAlign:"center"}}>
      "Time is the currency of life; spend it wisely."</h6>
      </div>
      

        </div>
    </div>
  )
}

export default WhyChoose
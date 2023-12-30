import React from 'react'
import img from '../../../assets/user.jpg'
import './UserHomeBanner.css'
function UserHomeBanner() {
  return (
   <>
      <div className='main'>
      <div className ='banner-left'
        style={{
          backgroundImage: `url(${img})`,
          
        }}
      ></div>
      <div className ='banner-right'>
      <h1 style={{padding:"40px",textAlign:"center"}}>Ride with confidence, arrive with safety. Your journey, our commitment to secure travels.

</h1>

      </div>
      



      </div>
   </>
  )
}

export default UserHomeBanner
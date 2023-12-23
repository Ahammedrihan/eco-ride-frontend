import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import UserHomeCarousal from '../../Components/User/HomeCarousal/UserHomeCarousal'
import WhyChoose from '../../Components/User/HomeCarousal/WhyChoose'
import Faq from '../../Components/User/Faq'

import img from "../../assets/Pool.Webp";


function Home() {
  return (
    <div>
      <Navbar/>
      <UserHomeCarousal/>
      {/* <div style={{display:"flex"}}>
      <div
        style={{
          backgroundImage: `url(${img})`,
          height: "540px",
          width:"1100px",
          marginLeft:"-1px"
        }}
      ></div>
      <div>
      
      </div>



      </div> */}
      
     
      <WhyChoose/>

      <Faq />
   
    


    </div>
  )
}

export default Home
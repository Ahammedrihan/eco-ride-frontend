import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import UserHomeCarousal from '../../Components/User/HomeCarousal/UserHomeCarousal'
import WhyChoose from '../../Components/User/HomeCarousal/WhyChoose'
import Faq from '../../Components/User/Faq'

import img from "../../assets/user.jpg";
import UserHomeBanner from '../../Components/User/HomeCarousal/UserHomeBanner'


function Home() {
  return (
    <div>
      <Navbar/>
      <UserHomeCarousal/>
      <UserHomeBanner/>
      <div style={{margin:"-10px",border:"none"}}> 
      <h5 style={{textAlign:"center",backgroundColor:"black",color:"white",paddingBottom:"90px"}}>
        Safety first, always. Your well-being is our top priority on every journey
</h5>
      </div>
 
      
     
      <WhyChoose/>

      <Faq />
   
    


    </div>
  )
}

export default Home
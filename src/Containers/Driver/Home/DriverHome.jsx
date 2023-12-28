import React from 'react'
import Navbar from '../../../Components/Driver/Navbar'
import CarousalBar from '../../../Components/Carousal/Carousal'
import SecondNavbar from '../../../Components/Driver/SecondNavbar'
import DriverHomeCarousal from '../../../Components/Driver/DriverHomeCarousal'
import './DriverHome.css'
import PaidIcon from '@mui/icons-material/Paid';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RouteIcon from '@mui/icons-material/Route';
import img from '../../../assets/car6.png'
import DriverFaq from '../../../Components/Admin/Home/driverFaq'


function DriverHome() {
  return (
    <div>
      <Navbar/>
      <SecondNavbar/>
      <DriverHomeCarousal/>
      <div style={{ margin: '30px', textAlign: 'center' }}>
  <h3 style={{ fontWeight: '600', fontSize: '30px' }}>Why drive with us</h3>

  <div style={{ margin: '30px auto', display: 'flex', justifyContent: 'center' }}>
    <img src={img} alt="" style={{ height: '200px' }} />
  </div>

  <div className="hello-container">
    <div className="hello-box">
      <PaidIcon fontSize='large' />
      <h4>Set your own hours</h4>
      <h6>You decide when and how often you drive.

</h6>
    </div>
    <div className="hello-box">
      <CalendarMonthIcon  fontSize='large' />
      <h4>Set your own hours</h4>
     
      <h6> Weekly payments in your bank account.</h6>
    </div>
    <div className="hello-box">
      <RouteIcon fontSize='large' />
      <h4>Set your own hours</h4>
      <h6>Get rides with nearby uses with better route planning</h6>
    </div>
  </div>
</div>
<DriverFaq/>

   
    </div>
  )
}

export default DriverHome


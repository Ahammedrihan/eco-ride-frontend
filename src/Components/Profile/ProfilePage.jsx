import React, { useState ,useEffect} from 'react';
import DriverSideBar from "../Driver/driverSidebar";
import axios from "../../Utils/axios"
import UserProfileSideBar from '../User/UserProfileSidebar';
import { driverLogout } from '../../../Redux/slices/driverSlice/driverauthSlice';
import { userLogout } from '../../../Redux/slices/userSlice/authSlice';

import { useDispatch } from "react-redux";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBListGroup,
  MDBListGroupItem
  
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import ProfileEdit from '../../Containers/User/Profile/ProfileEdit';


export default function ProfilePage(props) {
  const [userData,setUserData] = useState(null)
  const [isOpenModal,setIsOpenModal] = useState(false)
  const dispatch = useDispatch()

  console.log(isOpenModal,"IS MODLA OPEN")
  console.log(userData,"userData")


  const handleModalOpen = ()=>{
    setIsOpenModal(true)

  }
  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  
  useEffect (()=>{
   
    fetchUserData()
   
  },[])
  useEffect (()=>{
   
    fetchUserData()
   
  },[props.userBasicProileUpdated])

  const fetchUserData = ()=>{
    const response = axios.get(props.endPoint,{
      headers:{
        Authorization : `Bearer ${props.accessToken}`
      }
    }).then((response)=>{
      console.log(response,"lanl;andlfknadlknflkndflkndflknad")
      if(response.status ===200){
        setUserData(response.data)
        console.log("user data")

      }
    })
  }

//   const handleLogout = async()=>{
//     if(props.role === 'user'){
//       dispatch(driverLogout())
//     }else{
//       dispatch(driverLogout())
//     }
    
//     await axios.post(`api/user/logout/`,{refresh_token},{
//       headers:{
//         "Content-Type": "application/json",
//         Authorization:`Bearer ${accesstoken}`
//       }
//     }).then((response)=>{
//       if(response.status === 205){
//         console.log("logout sucess and blacklisted")
//         localStorage.removeItem("userData")
//         localStorage.clear()

//       }else{
//         console.log("balck list not done")
//       }
//     })
  
// }




  return (
    <section style={{ backgroundColor: '#eee', }}>
      {isOpenModal ? 
      <ProfileEdit onClose={handleModalClose} token = {props.accessToken} userId = {props.userId} data = {userData} fetchUserData={fetchUserData} />:null
      }

     <MDBContainer className="pt-5">
     <div style={{ display: 'flex'}}>
     <div className="container-fluid">
      <div className="row">
       <div className="col-md-3">
        {props.role == "user"?  <UserProfileSideBar/> : 
         <DriverSideBar />}
       </div>
      <div className="col-md-9" style={{paddingLeft:"50px"}}>
        <MDBRow>
          <MDBCol md="6" lg="12" >
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1" style={{fontWeight:"bold"}}>Welcome {userData?.first_name}</p>
                <div className="d-flex justify-content-center mb-2">
                </div>

                <Button style={{width:"100px",marginRight:"10px",backgroundColor:"green",border:"none"}} onClick={()=>handleModalOpen()}>Update</Button>
               {/* <Button style={{width:"100px",backgroundColor:"red",border:"none"}} onClick={()=>handleLogout()}>Logout</Button> */}
              </MDBCardBody>

            </MDBCard>
          </MDBCol>
          <MDBCol md="6"  lg="12">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.first_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last  Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.last_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.phone}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                
                <hr />
                {userData?.profile_info && userData.profile_info.length > 0 ?
                <>
                 <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{ userData?.profile_info[0]?.gender === "M" ?"Male":"Female" }</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Age</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted" style={{fontWeight:"bold"}}>{userData?.profile_info[0]?.age}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                </>:null}
              </MDBCardBody>
            </MDBCard>
            </MDBCol>
          <MDBCol md="6"  lg="12">
            <MDBCard className="mb-4 mb-lg-0">
               <MDBCardBody className="p-0">
                 <MDBListGroup flush className="rounded-3">
                   <MDBListGroupItem className=" p-3">
                     <MDBCardText style={{fontWeight:"bold",textAlign:"center",fontSize:"30px"}}>{userData?.account_info ?userData?.account_info?.length : "0" }</MDBCardText>
                     <MDBCardText style={{textAlign:"center"}}>Total Profile Address</MDBCardText>
                   </MDBListGroupItem>
                   <MDBListGroupItem className=" p-3">
                     <MDBCardText style={{fontWeight:"bold",textAlign:"center",fontSize:"30px"}}>{userData?.ride_info ? userData?.ride_info?.length : "0" }</MDBCardText>
                     <MDBCardText style={{textAlign:"center"}}>Total Ride History</MDBCardText>
                     </MDBListGroupItem>
                     {userData?.vehicle_info?
                     <>
                     
                      <MDBListGroupItem className=" p-3">
                     <MDBCardText style={{fontWeight:"bold",textAlign:"center",fontSize:"30px"}}>{userData?.vehicle_info?.length}</MDBCardText>
                     <MDBCardText style={{textAlign:"center"}}>Total Profile Vehicles</MDBCardText>
                   </MDBListGroupItem>
                     </>:
                     null}
    
                 </MDBListGroup>
               </MDBCardBody>
             </MDBCard> 
        </MDBCol>
        </MDBRow>
        </div>
      </div>
  </div>
</div>
</MDBContainer>
    </section>
  );
}



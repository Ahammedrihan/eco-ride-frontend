import React, { useEffect, useState } from "react";
import axios from "../../../Utils/axios";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {useSelector} from "react-redux"
import UserProfileSideBar from "../../../Components/User/UserProfileSidebar";


function UserActiveRide() {
  const userStoreData = useSelector((store)=>store.authuser.userData)
  const accessToken = userStoreData.data.access
  const [allTrips,setAllTrips] = useState([])
  const [isTripsAvailable,TripsAvailablesetIs] = useState(false)

  useEffect(()=>{
    UserActiveTripFunction()

  },[])

  const UserActiveTripFunction = async()=>{
    await axios.get('api/user/active-trip/',{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response)=>{
      if(response.status === 200){
        setAllTrips(response.data)
        TripsAvailablesetIs(true)
      }else if(response.status === 204){
        TripsAvailablesetIs(false)
      }
    })
  }

  return (
    <div>
          <div style={{ display: "flex", paddingRight: "20px", paddingTop: "20px" }}>
          <div style={{ flexBasis: "20%" }}>
          <UserProfileSideBar/>
           </div>
          <div style={{  borderRadius: "10px"  }}></div>
             <CollapsibleTable allTrips={allTrips}/>: 
          </div>
    </div>
  )
}
export default UserActiveRide


function Row(props) {
  const {allTrips}= props
  console.log(allTrips)
  const [open, setOpen] = React.useState(false);
  const [simpleIndex,setSimpleIndex] = useState(0)
  const [tripData,setTripData] = useState(allTrips ||null)
  console.log(tripData,",dj")

//   const tripsEndDate = allTrips?.Trip_end_time
//   const dateOfEndRide = new Date(tripsEndDate)
//   const tripDate = dateOfEndRide.getFullYear()+'-'+ (dateOfEndRide.getMonth()+1 ) +'-'+ dateOfEndRide.getDate()
 
//   const formattedEndDate = dateOfEndRide.toISOString().slice(0, 19).replace("T", " ");
//   const tripEndTime =  ''+formattedEndDate


//   const tripstart = allTrips?.created_at
//   const dateOfStart = new Date(tripstart)
//   const formattedStartDate = dateOfEndRide.toISOString().slice(0, 19).replace("T", " ");
//   const tripStartTime =  ''+formattedStartDate

   
    return (
      <React.Fragment>
            { tripData?.start_location_name? <>
         <TableRow style={{marginBottom:"30px"}}>
     
          <TableCell>
            
              <IconButton
              aria-label="expand row"
              size="small"  sx={{ color: "white" }}
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row"  sx={{ color: "white" }}>
            {simpleIndex+1}
          </TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc"}}>{allTrips?.start_location_name}</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc" }}>{allTrips?.end_location_name}</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc"}}>{allTrips?.total_distance} Km</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc" }}>₹ {allTrips?.amount}</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc" }}>{allTrips?.payment_status == true? 'Completed':'Pending'}</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc" }}>{allTrips?.payment_method =="payafter"?" Pay After":"Online"}</TableCell>
          <TableCell align="center" sx={{ color: "#c2b7cc" }}>{allTrips?.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Additional Info
                </Typography>
                {/* <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#c2b7cc" }}></TableCell>
                      <TableCell sx={{color: "#6f6975", fontWeight: "bold"  }}>Start Time</TableCell>
                      <TableCell align="center"  sx={{color: "#6f6975", fontWeight: "bold" }}>End Time</TableCell>
                      <TableCell align="center" sx={{color: "#6f6975", fontWeight: "bold" }}>Driver</TableCell>
                      <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold" }}>Vehicle Registration</TableCell>
                      <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold"  }}>Vehicle Name</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow >
                      <TableCell component="th" scope="row"  sx={{ color: "white" }}>
                      </TableCell>
                      <TableCell  sx={{ color: "#c2b7cc"}}>{tripStartTime}</TableCell>
                      <TableCell align="center"  sx={{ color: "#c2b7cc"}}>{tripEndTime}</TableCell>
                      <TableCell align="center"  sx={{ color: "#c2b7cc" }}>{allTrips?.driver.first_name}</TableCell>
                      <TableCell align="center"  sx={{ color: "#c2b7cc" }}>{allTrips?.vehicle.registration_number}</TableCell> 
                      <TableCell align="center"  sx={{ color: "#c2b7cc" }}>{allTrips?.vehicle.vehicle_name}</TableCell> 

                    </TableRow>
                  </TableBody>
                </Table> */}
              </Box>
            </Collapse>
            </TableCell>
        </TableRow>

        </> : <>
        <TableRow>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}> </TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}></TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}> </TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}></TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}></TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}>No Active Rides</TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}> </TableCell>
        <TableCell align="center" sx={{ color: "#c2b7cc" }}></TableCell>

        </TableRow>
        </>
}
      </React.Fragment>
    );
  }

  
  
  
  function CollapsibleTable(props) {
    const {allTrips} = props
   
    return (
      <div style={{backgroundColor:"black",overflowX: "auto" }}  >
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 900, backgroundColor: "#000000" }}
          aria-label="simple table">
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
              <TableCell sx={{ color: "white" }}></TableCell>
                <TableCell sx={{ color: "#6f6975", fontWeight: "bold"  }}>ID</TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold" }}>
                  From 
                </TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold" }}>
                  Destination
                </TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold"  }}>
                  Distance
                </TableCell>
               
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold"  }}>
                  Amount
                </TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold"  }}>
                  Payment Status
                </TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold"  }}>
                  Payment Mode
                </TableCell>
                <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold" }}>
                  Trip ID
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#6f6975", fontWeight: "bold" }}>
                  </TableCell>
             
              </TableRow>
            </TableHead>
            <TableBody>
             <Row allTrips={allTrips} key={allTrips.id}/>
            </TableBody>
          </Table>
        </Table>
      </TableContainer>
      </div>
    );
  }
  


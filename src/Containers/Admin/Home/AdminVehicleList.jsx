
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { Button } from "react-bootstrap";
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

import SideBar from './SideBar';
import AdminSideBar from '../../../Components/Admin/AdminSideBar';
 

function AdminVehicleList() {
    const adminStoreData = useSelector((state) => state.adminauth.adminAuthTokenData);
    const accessToken = adminStoreData.data.access
    const [userVehicle, setUserVehicle] = useState();



    useEffect(() => {
        axios.get("api/admin/home/all-vehicles/", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((response) => {
            {
              if (response.status === 200) {
                console.log(response.data, "just a respone");
                setUserVehicle(response.data);
              } else {
                console.log("not able to fetch user vehicle info");
                console.log(response.message)
              }
            }
          }).catch((error)=>{
            console.log(error)
          });
      }, []);

  return (
         <>
        <div style={{ display: "flex", paddingRight: "20p", paddingTop: "20px" }}>
          <div style={{ flexBasis: "20%" }}>
            < AdminSideBar/>
          </div>
        <div style={{ flexBasis: "70%", borderRadius: "10px"  }}>
            <CollapsibleTable userVehicle={userVehicle}  />
          </div>
        </div>
    </>

  )
}

export default AdminVehicleList



function Row(props) {
  const { vehicle } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
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
          {vehicle.id}
        </TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.vehicle_name}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.registration_number}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.vehicle_brand}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.vehicle_color}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.seat_capacity}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.mileage}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle.insurance_end_date}</TableCell>
        <TableCell align="center" sx={{ color: "white" }}>{vehicle?.default ?"Active":"In Active"}</TableCell>

  
        <TableCell align="center" sx={{ color: "white" }}>
       
        </TableCell>

      


      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}></TableCell>
                    <TableCell sx={{ color: "white" }}>Vehicle </TableCell>
                    <TableCell align="right"  sx={{ color: "white" }}>Vehicle Type</TableCell>
                    <TableCell align="right" sx={{ color: "white" }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={vehicle.id}>
                    <TableCell component="th" scope="row"  sx={{ color: "white" }}>
                    </TableCell>
                    <TableCell  sx={{ color: "white" }}>{vehicle.vehicle_year}</TableCell>
                    <TableCell align="right"  sx={{ color: "white" }}>{vehicle.vehicle_type}</TableCell>
                    <TableCell align="right">
                      {" "}
                      {/* <img
                        src={img}
                        alt={`Vehicle ${vehicle.id}`}
                        style={{ width: "50px", height: "50px" }}
                      /> */}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function CollapsibleTable(props ) {

  const {userVehicle} = props
  
  return (
    <>
    {userVehicle ?
     <>
       <div style={{backgroundColor:"black"}}>
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, backgroundColor: "#000000" }}
        aria-label="simple table">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "white" }} />
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Vehicle Name
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Registration 
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Vehicle Brand
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
              Vehicle Color
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Seat Capacity
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Mileage
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Insurance Validity
              </TableCell>
              <TableCell align="center" sx={{ color: "white" }}>
                Vehicle Status
              </TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {userVehicle?.data.map((vehicle) => (
              <Row vehicle={vehicle} key={vehicle.id}   />
            ))}
          </TableBody>
        </Table>
      </Table>
    </TableContainer>
    </div>


      </>:null}
  
    </>
  );
}













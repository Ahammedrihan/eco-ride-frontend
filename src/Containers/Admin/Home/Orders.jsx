import  React,{useState,useEffect} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from '../../../Utils/axios';



export default function Orders() {

  const [ActiveTrips,SetActiveTrips] = useState(null)
  console.log(ActiveTrips,"ACTIVE TRIPS")


  useEffect(()=>{
    const getActiveTrips = async()=>{
      await axios.get('api/admin/home/active-trips')
      .then((response)=>{
        if (response.status === 200){
          SetActiveTrips(response.data)
        }else if(response.status === 204){
          console.log("no active Trips")
        }
      }).catch((error)=>{
        console.log("error",error)
      })
    }
    getActiveTrips()
  },[])
 

  return (
    <React.Fragment>
      <Title>Active Trips</Title>
      {ActiveTrips !== null ? <>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>From</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Ride Status</TableCell>
            <TableCell>Driver</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Trip ID</TableCell>
          </TableRow>
        </TableHead>         
       { ActiveTrips?.data.map((trip,index)=>(
          <TableBody>
       
            <TableRow key={index} >
              <TableCell>{index+1}</TableCell>
              <TableCell>{trip?.start_location_name}</TableCell>
              <TableCell>{trip?.end_location_name}</TableCell>
              <TableCell>{trip?.trip_status}</TableCell>
              <TableCell>{trip?.driver}</TableCell>
              <TableCell>{trip?.user}</TableCell>
              <TableCell>{trip?.amount}</TableCell>
              <TableCell>{trip?.id}</TableCell>
              
            </TableRow>
            </TableBody>
             ))} 
   
      </Table>
        </>: <h3>
          No Active Rides Present
          </h3>}
     
    </React.Fragment>
  );
}
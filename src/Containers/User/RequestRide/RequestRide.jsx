import React, { useState, useEffect } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./RequestRide.css";
import axios from "../../../Utils/axios";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Swal from "sweetalert2";
import ReactDOM from 'react-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useNavigate } from "react-router-dom";
import { SwipePOP } from "./Swipe";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function RequestRide() {
  const navigate = useNavigate()
  const userStoreData = useSelector((store) => store.authuser.userData);
  const userId = userStoreData.user.user_id;
  const userAccessToken = userStoreData.data.access;
  const [isactiverDrivers, setIsActiveDrivers] = useState(false)
  const [userSelectDefaultAddress, setUserSelectDefaultAddress] = useState(false);
  const [ismodalOpen, IssetModalOpen] = useState(false);
  const [wheatherUserHaveDefaultAddress,setWheatherUserHaveDefaultAddress] = useState(false);
  const [activerDrivers, setActiveDrivers] = useState([{
    driverId:"",
    driverDistance : "",
    driverLatitude : "",
    driverLongitude : "",
    driverVehicleDetails : "",
    driverBasicDetails : ""
  }]);
  console.log(activerDrivers)
  const [OrginLocationPropPassedDataforForm,setOrginLocationPropPassedDataforForm] = useState(null);
  const [DestinationLocationPropPassedDataforForm,setDestinationLocationPropPassedDataforForm] = useState(null);
  const [userWantToGo,setuserWantToGo] = useState({
    from : "",
    to : ""
  })
  const [userDefaultLatLng, setUserDefaultLatLng] = useState(null);
  const [userSelectDefaultAddressData, setUserSelectDefaultAddressData] =
    useState({
      geometry: {
        coordinates: [],
      },
    });
 

 
  useEffect(()=>{
    if (userDefaultLatLng){
      setuserWantToGo({
        from: userDefaultLatLng ,
        to: DestinationLocationPropPassedDataforForm
      }
      )
    }else{
      setuserWantToGo({
        from: OrginLocationPropPassedDataforForm ,
        to: DestinationLocationPropPassedDataforForm
      })
    }
   
  },[OrginLocationPropPassedDataforForm,userDefaultLatLng])


  const handleShowNearByDrivers = async () => {
    const repsonse = await axios
      .put(`api/user/nearby-drivers/${userId}/`,OrginLocationPropPassedDataforForm, {
        headers: {
          "Content-Type":"application/json",
          Authorization: `Bearer ${userAccessToken}`,
        },
        
      })
      .then((response) => {
        if (response.status === 200) {
       
          setActiveDrivers( response.data.map(driver=>({
            driverId:driver.driver_id,
            driverDistance : driver.distance,
            driverLatitude : driver.latitude,
            driverLongitude : driver.longitude,
            driverVehicleDetails : driver.driver_vehicle,
            driverBasicDetails : driver.driver_basic
            

          }))
          );
          setIsActiveDrivers(true)
        } if (response.status === 204) {
          console.log("failed");
          Swal.fire({
            title: "No Drivers Found",
            text: "Due to heavy booking no drivers are active",
            icon: "error",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Try later'
          }).then((result)=>{
            if (result.isConfirmed){
              navigate('/')
              console.log("HEY HOW ARE YOU")
            }
          });
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response.status === 404) {
          console.log("failed");
          Swal.fire({
            title: "No Locations Found",
            text: "Enter locations to find nearby drivers",
            icon: "error",
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Enter'
          }).then((result)=>{
            if (result.isConfirmed){
            }
          });
        }
      });
  };



  const locationDataForForm = (orgin, destination) => {
    setOrginLocationPropPassedDataforForm(orgin);
    setDestinationLocationPropPassedDataforForm(destination);
  };

  const handleUserSelectDeaultAddressTurnOn = (e) => {
    e.preventDefault();
    setUserSelectDefaultAddress(true);

    if (userSelectDefaultAddress){
      const { latitude, longitude } = userDefaultLatLng;

      setUserSelectDefaultAddressData({
        geometry: {
          coordinates: [longitude, latitude],
        },
      });
      
    };
  
  };

  const handleUserSelectDeaultAddressTurnOff = (e) => {
    e.preventDefault();
    setUserSelectDefaultAddress(false);
    setUserDefaultLatLng(null)
  };

  const handleScheduleForLatterModalOpen = () => {
    IssetModalOpen(true);
  };

  const handleScheduleForLatterModalClose = () => {
    IssetModalOpen(false);
  };


    useEffect(() => {
      
      const UserDeaultAddressFetch = async () => {
        await axios
          .get("api/user/user-default-address", {
            headers: {
              Authorization: `Bearer ${userAccessToken}`,
            },
          })
          .then((response) => {
            if (response.status === 200) {
              console.log("default address");
              console.log(response.data, "default address");
              setUserDefaultLatLng(response.data);
              setWheatherUserHaveDefaultAddress(true)

            } else {
              console.log(" address failed");
            }
          })
          .catch((error) => {
            console.log("error address :", error);
            const reason = error.response.data.message
            setWheatherUserHaveDefaultAddress(false)
            // Swal.fire({
            //   title : reason,
            //   text : "Set default address In profile",
            //   icon : "error",
            //   showCancelButton: true,
            //   confirmButtonColor: '#3085d6',
            //   cancelButtonColor: '#d33',
            //   confirmButtonText: 'Yes'
            // }).then((result)=>{
            //   if(result.isConfirmed){
            //     navigate('/address')
            //   }else if (result.dismiss) {
            //     // User clicked "Cancel" or closed the modal
                setUserSelectDefaultAddress(false);              
          
          });
      };
      UserDeaultAddressFetch();
   
    }, []);
    
    


  return (
    <>
      <Navbar />
      <div className="containerFluid" style={{ display: "flex" }}>
        <div
          className="left-parent"
        >
          <MapComponent
            locationDataForForm={locationDataForForm}
            userSelectDefaultAddress={userSelectDefaultAddress}
            userSelectDefaultAddressData={userSelectDefaultAddressData}
            activerDrivers = {activerDrivers}
            isactiverDrivers = {isactiverDrivers}
            handleShowNearByDrivers = {handleShowNearByDrivers}
            userAccessToken = {userAccessToken}
            userId={userId}
          />
        </div>

        <div className="right-parent " style={{ paddingTop: "20px" }}>
          <Card
            style={{
              borderColor: "grey",
              borderWidth: "2px",
              width:"330px",
              borderStyle: "solid",
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                  lineHeight: 2,
                  color: "black",
                }}
                color="text.secondary"
                gutterBottom
              >
                Make your ride
              </Typography>

              <Typography color="text.secondary">
            
                    {wheatherUserHaveDefaultAddress ? 
             
                    (
                      <>
                               <Typography color="text.secondary">
                                        Set default address as starting point

                        </Typography>
                      {userSelectDefaultAddress ?(
                         <Switch
                         checked={userSelectDefaultAddress}
                         onChange={handleUserSelectDeaultAddressTurnOff}
                       />
                      ):
                      <Switch
                      checked={userSelectDefaultAddress}
                      onChange={handleUserSelectDeaultAddressTurnOn}
                    />}   
                   </> ):null} 

              
              {wheatherUserHaveDefaultAddress ? 
              (
                   <Chip
                  label={userSelectDefaultAddress ? 'Default Address' : "Click for default address"}
                  color={userSelectDefaultAddress ? 'success' : 'default'}
                  size="small"
                />):null}

              </Typography>

              <div style={{ margin: "10px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h5" variant="h5"></Typography>
                  <Box component="form">
                    <TextField
                      margin="normal"
                      value={

                        userWantToGo ? userWantToGo?.from?.name :userWantToGo?.from?.id
                      }
                      fullWidth
                      id="from"
                      label="from"
                      name="from"
                      autoComplete="=from"
                      autoFocus
                      style={{ borderRadius: "20px", height: "40px" }}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      value={
                        DestinationLocationPropPassedDataforForm
                          ? DestinationLocationPropPassedDataforForm.name
                          : " "
                      }
                      name="destination"
                      label="destination"
                      type="destination"
                      autoFocus
                      id="destination"
                      autoComplete="current-password"
                      InputProps={{ readOnly: true }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      style={{ backgroundColor: "#000" }}
                      onClick={handleShowNearByDrivers}
                      // disabled={!OrginLocationPropPassedDataforForm}
                    >
                      Choose driver
                    </Button>
                    {/* <Button
                      fullWidth
                      variant="contained"
                      sx={{ mt: 1, mb: 2 }}
                      style={{ backgroundColor: "#000" }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScheduleForLatterModalOpen();
                      }}
                    >
                      {" "}
                      {ismodalOpen && (
                        <div>
                          <NestedModal />
                        </div>
                      )}
                      set
                    </Button> */}
                  </Box>
                </Box>
              </div>
            </CardContent>
            <CardActions></CardActions>
          </Card>
          {/* <div>
            <h3>Click here to see Nearby drivers</h3>
            <button
              style={{ backgroundColor: "#000" }}
              
            >
              Show Drivers
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}



export default RequestRide;










export const MapComponent = (props) => {
  const { locationDataForForm, userSelectDefaultAddress,userSelectDefaultAddressData,activerDrivers,isactiverDrivers,handleShowNearByDrivers,userAccessToken,userId } = props;
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [distance,setDistance]= useState(null)

  console.log(distance,"HEY THIS IS THE DISTANCE")
  console.log(destinationLocation,"destinationLocation")


  
  useEffect(()=>{

    if (originLocation && destinationLocation){
      const from_longitude = originLocation.coordinates[0]
      const from_latitude = originLocation.coordinates[1]
  
      const to_longitude = destinationLocation.coordinates[0]
      const to_latitude = destinationLocation.coordinates[1]
      
      const UserDistanceData = {
        from_latitude :from_latitude,
        from_longitude :from_longitude,
        to_latitude : to_latitude,
        to_longitude :to_longitude,
      }
    


    const TravelDistance = async()=>{
      await axios.post('api/user/user-travel-distance/',UserDistanceData,{
        headers:{
          Authorization: `Bearer ${userAccessToken}`
        }
      }).then((response)=>{
        if (response.status == 200){
          setDistance(response.data)
        }else{
          console.log(" not distance fetched")
        }
      }).catch((error)=>{
        console.log("error",error)
      })
    }
    
    TravelDistance() 
  }
  },[originLocation,destinationLocation])









  console.log(activerDrivers,"hello")
  
  console.log(originLocation,"ORGIN LOCATION ")



  useEffect(() => {

    
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWhhbW1lZHJpaGFuY20iLCJhIjoiY2xuc2x5cHpyMWx4NjJ2cGYzcTl5czgyZSJ9.86pNM73M4mvOfyaDjOJ4ZA";
    const defaultStartingPoint = [76.4901, 9.9425176];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/ahammedrihancm/clqmbde7v00qj01nwhemxd9yf",
      center: defaultStartingPoint,
      zoom: 13,
    });

    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      instructions: false,
      profileSwitcher : false,
      profile: 'mapbox/driving', // Specify the default profile
     
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.addControl(directions, "top-left");
    directions.on("route", (e) => {
     
      let origin;

      if (userSelectDefaultAddress) {
        origin = userSelectDefaultAddressData;
      } else {
        origin = directions.getOrigin();
      }
      const destination = directions.getDestination();

      if (origin && origin.geometry && origin.geometry.coordinates) {
        console.log("From:", origin.geometry.coordinates);
        geocodeLocation(origin.geometry.coordinates, setOriginLocation);
      }

      if (
        destination &&
        destination.geometry &&
        destination.geometry.coordinates
        
      ) {
        console.log( destination.geometry.coordinates,"hayyyy")
        geocodeLocation(destination.geometry.coordinates,setDestinationLocation);
      }
    });

  

    if (isactiverDrivers){
      activerDrivers.map((driver) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([parseFloat(driver.driverLongitude), parseFloat(driver.driverLatitude)])
          .addTo(map);

    const container  = document.createElement('div')
    ReactDOM.render(<MyProfileComponent driver={driver} distance={distance} originLocation={originLocation} destinationLocation={destinationLocation} userAccessToken={userAccessToken} userId={userId}/>, container);

    const popup = new mapboxgl.Popup().setDOMContent(container)
      
            marker.setPopup(popup);
            marker.getElement().addEventListener("mouseenter", () => {
              popup.addTo(map);
            });
            marker.getElement().addEventListener("mouseenter", () => {
              popup.remove();
            });
          }) 
    
    }

    

      


    return () => {
      map.remove();
    };
  

  }, [activerDrivers]);




  const geocodeLocation = (coordinates, setLocation) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const locationName = data.features[0].place_name;

          const splitData = locationName.split(", ");
          const name = splitData[0];
          const street = splitData[1];
          const city = splitData[2];
          const state = splitData[3];
          const postalCode = splitData[4];
          const coordinates = data.query

          setLocation({
            name,
            street,
            city,
            state,
            postalCode,
            coordinates
          });
        }
      })
      .catch((error) => console.error("Geocoding Error:", error));
  };

  useEffect(() => {
    sentLocationDataToForm();
  }, [originLocation, destinationLocation]);


  const sentLocationDataToForm = () => {
    locationDataForForm(originLocation, destinationLocation);
  };


  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }} />
    </div>
  );
};



const MyProfileComponent = (props) => {
  const {driver,distance,originLocation,destinationLocation,userAccessToken,userId} = props
  console.log(distance,"ASDFGHJKLKJHGFDDFGHJHGF")

  const [isSwipePopUp,setisSwipePopUp] = useState(false)

  const handleSwipePopUp = ()=>{
    setisSwipePopUp(true)
  }

  const handleCloseSwipePopUp = ()=>{
    setisSwipePopUp(false)
  }


  return ( 
    <Card style={{ width: "100%", height: "100%"}}>
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column'}}>
        <Avatar variant="rounded" src="avatar.jpg" />
        <Stack>
          <Typography  sx={{ color: "#000000" }}>
            Vehicle: {driver.driverVehicleDetails.vehicle_brand} {driver.driverVehicleDetails.vehicle_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Driver Name: {driver.driverDistance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Driver Name: {driver.driverDistance}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Seat Capacity: {driver.driverVehicleDetails.seat_capacity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            vehicle Type: {driver.driverVehicleDetails.vehicle_type}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Distance from you : {distance ? distance.distance :""}
          </Typography>
          
        </Stack>
      </Box>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
      >
       
<Button variant="contained" color="success" style={{width:"90px",height:"30px"}} onClick={handleSwipePopUp}>
  Book 
</Button>
{isSwipePopUp && <SwipePOP onClose={handleCloseSwipePopUp} driver={driver} distance={distance} 
    originLocation={originLocation} destinationLocation={destinationLocation} userAccessToken={userAccessToken} userId={userId}/>}

        
      </Stack>
    </Card>
  );
};


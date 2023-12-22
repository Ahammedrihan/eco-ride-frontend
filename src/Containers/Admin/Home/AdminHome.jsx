import React,{useEffect,useState} from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import axios from '../../../Utils/axios';

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux'
import { compose } from 'redux';
import BarChart from './BarChart';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
      
//       {'.'}
//     </Typography>
//   );
// }



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard() {

  const adminStoreData = useSelector((store)=>store.adminauth.adminAuthTokenData)
  const accessToken = adminStoreData.data.access

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {setOpen(!open)};
  const [basicCounts, setBasicCounts] = useState(null)



  useEffect (()=>{

  
    adminHomePageData()
  },[])



  const adminHomePageData = async()=>{
    await axios.get('api/admin/home/data',{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then((response)=>{
      if (response.status === 200){
        setBasicCounts(response.data)
        console.log(response.data)
      }else if(response.status === 204){
        console.log("NO DATA FETCHED ")

      }
    }).catch((error)=>{
      console.log("error",error)
    })
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="dark"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
            </IconButton>
          </Toolbar>
        </AppBar>
{/*================================== SIDE BAR START=========================================  */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
             </Toolbar>
             <Divider />
              <List>
              <NavLink
                to="/admin/user-list"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="User's" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/admin/driver-list"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Driver's" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/admin/trip-list"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <DriveEtaIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Trips" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/admin/vehicle-list"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Vehicles" />
                </ListItemButton>
              </NavLink>
            </List>
            <List>
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reset Password" />
                </ListItemButton>
              </NavLink>
            </List>
      
        </Drawer>
{/*================================== SIDE BAR END=========================================  */}
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits  title={"Total User"} 
                  number={basicCounts?.data?.number_of_users}
                   text1={"No of active user"}
                   text2={"No of blocked user"}
                   text1Value={basicCounts?.data?.number_of_users_active}
                   text2Value={basicCounts?.data?.number_of_users_blocked}/>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits title={"Total Drivers"}
                   number={basicCounts?.data?.number_of_drivers}
                   text1={"No of active drivers"}
                   text2={"No of blocked drivers"}
                   text1Value={basicCounts?.data?.number_of_drivers_active}
                   text2Value={basicCounts?.data?.number_of_drivers_blocked}
                    />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits title={"Total Vehicles"}
                   number={basicCounts?.data?.number_of_vehicles}
                   text1={"No of default vehicles "}
                   text2={"No of non-active vehicles"} 
                   text1Value={basicCounts?.data?.number_of_default_vehicles}
                   text2Value={basicCounts?.data?.number_of_non_activevehicles}/>
                   
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits title={"Total Trips"} 
                   number={basicCounts?.data?.number_of_finished_trips}
                   text1={"No of online payment "}
                   text2={"No of pay later payment"} 
                   text1Value={basicCounts?.data?.number_of_finished_pay_online}
                   text2Value={basicCounts?.data?.number_of_finished_payafter}
                  />
                </Paper>
              </Grid>
              <BarChart basicCounts={basicCounts}/>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
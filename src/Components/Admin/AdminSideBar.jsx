import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useState, useEffect } from "react";

function AdminSideBar() {

const drawerWidth = 100;
const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
  
  },
});

  const [open, setOpen] = useState(true);
  const toggleSideBar = () => {
    setOpen(!open);
  };

  const hideSidebar = () => {
    setOpen(false);
  };

  const showSidebar = () => {
    setOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 950) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 


  return (
    <div>
         <ThemeProvider theme={darkTheme}>
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        {open ? (
          <button
            onClick={hideSidebar}
            style={{ border: "none" }}
          >
            <MenuIcon
              style={{ marginLeft: "80px", marginTop: "20px" }}
            />
          </button>
        ) : (
          <button
            onClick={showSidebar}
            style={{ backgroundColor: "ffff", border: "none" }}
          >
            <MenuOpenIcon />
          </button>
        )}

        {open && (
          <div>
            <Toolbar />
            <List>
              <NavLink
                to="/admin/home"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {" "}
                <ListItemButton disablePadding>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </NavLink>
            </List>
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
            {/* <List>
              <NavLink
                to="/user-trips"
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
            </List> */}
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
                  <ListItemText primary=" Driver Vehicles " />
                </ListItemButton>
              </NavLink>
            </List>
            {/* <List>
              <NavLink
                to="/reset-password"
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
            </List> */}
            
          </div>
        )}
      </Drawer>
    </ThemeProvider>

    </div>
  )
}

export default AdminSideBar






   


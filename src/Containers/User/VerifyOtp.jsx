import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router-dom';
import {useDispatch ,useSelector} from 'react-redux'
import axios from '../../Utils/axios'
import jwt_decode from 'jwt-decode'
import { userLoginUrl } from '../../Utils/urls';
import { userLogin } from '../../../Redux/slices/userSlice/authSlice';
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { display } from '@mui/system';

const defaultTheme = createTheme();

const VerifyOTP = () => {
  const [timer, setTimer] = useState(300); // Set the duration in seconds (5 minutes = 300 seconds)

  useEffect(() => {
    const interval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      // Decrement the timer
      setTimer(timer => timer - 1);

      // Check if the timer has reached 0
      if (timer < 0) {
        clearInterval(interval);
      }
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="container">
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verify OTP
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter your otp"
              name="otp"
              autoComplete="otp"
            //   value={email}
            //   onChange={(e)=>{
            //     setEmail(e.target.value)
            //   }}
              autoFocus
            />
   
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Submit Otp
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default VerifyOTP;
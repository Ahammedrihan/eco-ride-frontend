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
import { Navigate, redirect, useNavigate } from 'react-router-dom';
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
   
  const [timer, setTimer] = useState(100);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('randomUserEmail')


  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
        const verificationFailFunction = async()=>{
            await axios.post('api/user/verify-otp-fail/',{email})
            .then((response)=>{
                console.log(response.data)
            })
        }
      navigate('/register'); 
      verificationFailFunction()

    }
  }, [timer]);



  const verifyOtpSuccess = async()=>{
   

    await axios.post('api/user/verify-otp/',{email,otp}
    ).then((response)=>{
        if (response.status === 200){
            console.log(response.data)
            Swal.fire({
                title: 'Success!',
                text: 'The user details have been updated.',
                icon: 'success'
              })
              navigate('/login');
        }else{
            Swal.fire({
                title: 'Verification Failed!',
                text: 'Please Try Again.',
                icon: 'error'
              })
        }
    }).catch((error)=>{
        console.log(error,"error")
        Swal.fire({
            title: 'Verification Failed!',
            text: 'Please Try Again.',
            icon: 'error'
          })
    })


  }


  const handleSubmit = () => {
    verifyOtpSuccess()
    

  }

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
          <Typography component="h1" variant="h6">
            {/* {email} */}
          </Typography>
         <strong>Time remaining: {timer} seconds </strong> 

          <Box component="form"  noValidate  onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="Enter your otp"
              name="otp"
              autoComplete="otp"
              value={otp}
              onChange={(e)=>{
                setOtp(e.target.value)
              }}
              autoFocus
            />
   
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              // onClick={()=>handleSubmit()}
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
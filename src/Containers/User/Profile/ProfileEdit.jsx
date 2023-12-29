import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Col, Row, Card, Form, InputGroup } from 'react-bootstrap';
import axios from "../../../Utils/axios";
import Swal from "sweetalert2";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  margin:"30px",
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProfileEdit(props) {
 
  const [open, setOpen] = React.useState(true);
  const handleClose = () =>{
    setOpen(false);
    props.onClose()
  } 
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone : "",
    // gender:"",
    // age : "",
    // alternate_phone:""
  });

  console.log(formData,"")
  
  useEffect(()=>{
    const data = props.data
    setFormData(data)
  },[props.data])


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
     const response = await axios.put(`api/user/update-profile/`, formData, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      if (response.status === 200){
        handleClose()
        Swal.fire({
          title :"Success!",
          text: 'Profile Updated succesfullt',
          icon: 'success'
        })
       
        props.fetchUserData()
      }
    } catch (error) {
      console.error("Error updating profile details", error);
    }
  };




  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <>
      <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        <div className="card h-100" style={{width:"600px"}}>
          <div className="card-body">
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <h6 className="mb-3 text-primary"> Update Your Personal Details</h6>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
                
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="alternate_phone">Alternate Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="alternate_phone"
                    placeholder="Enter alternate number"
                    value={formData.alternate_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                 
                  <Form.Group controlId="gender">
                    <Form.Label>gender</Form.Label>
                    <Form.Select defaultValue="M" name="gender" id="gender" onChange={handleChange}>
                      <option value="F">Female</option>
                      <option value="M">Male</option>
                    </Form.Select>
                  </Form.Group>
            
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="form-group">
                  <label htmlFor="country">Age</label>
                  <input
                    type="url"
                    className="form-control"
                    id="age"
                    placeholder="Enter your age "
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
            </div>
            <div className="row gutters">
              
              
            </div>
            <div className="row gutters">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="text-right d-flex justify-content-center">
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleSubmit}
                    style={{backgroundColor:"green",margin:"2px",border:"none"}}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    id="submit"
                    name="submit"
                    className="btn btn-primary mt-3"
                    onClick={handleClose}
                    style={{backgroundColor:"red",margin:"2px",border:"none"}}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
        </Box>
      </Modal>
    </div>
  );
}




import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={{margin:"50px"}}>
        <h3 style={{padding:"20px"}}>Frequently asked questions</h3>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 ,fontFamily:"inherit",fontWeight:"500"}}>
          How to request a ride?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' ,fontSize:""}}>
          <h5>To request an eco-ride follow the next steps:</h5>

          Open the eco-ride web app tap request ride button on the home page.
          Where you can see an userfriendly map navigation map where you have options to enter “ enter pickup location” and destination “ enter destination location” 
          the application will check your entered places and also on the right part you have an option for select "Default address".
          Once you set your location there is an option to find the nearyby drivers. By clicking you can see the nearby drivers with your location.
          you can confirm driver by clicking on the the popup shown on map. Once you have selected your driver you can see more details about the vehicle
          along the driver and travel details, also you have an option for payment either you can pay by Online or After ride
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0,fontFamily:"inherit",fontWeight:"500" }}>How to pay online ?</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary',fontSize:"" }}>
           Once you have selected your car as per matching requirmments. You can see
           there is an option to make payment, either you can pay through online or you can pay afther ride 
           if you are planning to pay through online payment, you have to select the payment mode like Debit, Credit, Upi.
           Once you choose the model all you need you enter you basic credentials. <b> Always aware that we don't have any hidden charges and also our service providers will never contact you for bank credentials </b> 
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ flexShrink: 0 ,fontFamily:"inherit",fontWeight:"500"}}>
            How secure is my data ?
          </Typography>
       
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary',fontSize:"" }}>
            We only store  data which you have provided during the time of registration and booking time.
            We store those data to improve the user experience for the next time. We won't share you personal data 
            with any third part applications
        
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ flexShrink: 0,fontFamily:"inherit",fontWeight:"500" }}>How does cab rent calculates ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary',fontSize:"" }}>
            You won't have any kind of hidden charges, We charge user on the basics of 
            which type of vehicle you opted for ride. If driver asks any kind of additional charges 
            other than amount showing on website you a wont't need to pay money. Instead report those drivers

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

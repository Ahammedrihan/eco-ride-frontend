
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DriverFaq() {
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
          How to get a ride ?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary' ,fontSize:""}}>
          <h5>To became a driver with eco-ride follow these steps:</h5>

          Open the eco-ride web app create a driver account. Once you have succesfully sign in . In driver home page you can see a <b>Get started</b> button it is the initial setup for getting driver live.
          before click the get start button you have to make sure that you have already added a default address and vehicle. If not, create it first. Once you have done that 
          you can come back to hame page and click on the Get started button later you redirected to your loation activation page. where you can see two opttions for choosing active location address.
          you have options like <b>Choose Cuurent Location</b> and <b>Choose Default Address</b> Once you have choosed the option your location became live and your location will listed in user side. Once user books
          driver get notifiation on the same page.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ flexShrink: 0,fontFamily:"inherit",fontWeight:"500" }}>How many trips I can take in a day ?</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary',fontSize:"" }}>
          There is no limitaions in number of trips Which you can take. You can take pleanty of drives according to your convenience. 
          But we suggest you to take appropriate rest ans sleep before each trip. We bother your and user health
        
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
            How do you connect users with drivers?
          </Typography>
       
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: 'text.secondary',fontSize:"" }}>
            We have a inteligent trip planning system which the the user can see each nearby driver in the map.
            Once the user like you profile and you vehicle user can book taxi.

        
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
        We calcute cab rent on the basic of your vehicle features

          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

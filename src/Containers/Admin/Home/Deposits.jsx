import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits(props) {

  const {title,number,text1,text2,text1Value,text2Value} = props
  const styles = {
    boldText: {
      fontWeight: 'border',
      
    },
  };

  return (
    <React.Fragment>
      
      <Typography component="p" variant="h4" sx={{p:3}}>
        {number}
      </Typography>
      <Title>{title}</Title>
      <Typography color="text.secondary" sx={{  fontSize: "small", m: 1, p: '!important' }}>
        {text1} :  <strong  style={{fontSize:18}}>{text1Value}</strong>
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1, fontSize: "small", m: 1, p:'!important' }}>
        {text2} :  <strong  style={{fontSize: 18}}>{text2Value}</strong>
      </Typography>

     
      
    </React.Fragment>
  );
}
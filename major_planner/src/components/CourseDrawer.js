import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';


import DeleteIcon from '@mui/icons-material/Delete';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TmpDrawer(props) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleClick = (classObj) => {
    for (let index in props.classArr){
      if (props.classArr[index][0] == classObj){  
        props.classArr.splice(index,1);
        console.log('Classes taken arr',props.classArr);
      }
    }
  }

  const list = (anchor) => (
    <Box
      sx={{justifyContent: 'center', display: 'flex', 
        flexDirection: 'column', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 280}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '4vh', fontSize: '14px'}}>
        <h1> Classes Selected </h1>
      </div>
      

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2vh', flexDirection: 'column'}}>
        <Container>
          <Grid container spacing={3}>
            {props.classArr.map((card) => (          
              <Grid item key={card}>
                <Card
                  sx={{ height: '100%', width:'240px'}}
                >
                  
                  <CardActions>
                    <div style={{height: '0px', paddingLeft: '180px' , display: 'flex'}}>
                      <IconButton aria-label="delete" size="large"
                        onClick = {() => {handleClick(card[0])}}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </CardActions>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'left', height: '41px' }}>
                      <h1> {card[0]} </h1>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'left', paddingBottom: '3px' }}>
                      <h4>{card[1]["Class Name"].replace(/^([^ ]+ ){2}/, '')}</h4>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                      Credits: {card[1]["Credits"]}
                    </div>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      
      <footer style={{ display: 'flex', paddingBottom: '8px', paddingLeft: '100px' , position: 'fixed', bottom: '0' }}>
        <Button variant="contained" href="/home">
          Submit
        </Button>
      </footer>

    </Box>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'right', height: '0vh'}}>
      {['Cart'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={'right'}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}

          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
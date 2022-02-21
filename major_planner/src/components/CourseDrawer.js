import * as React from 'react';
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function TemporaryDrawer() {
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

  const list = (anchor) => (
    <Box
      sx={{justifyContent: 'center', display: 'flex', 
        flexDirection: 'column', width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 280 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div style={{ display: 'flex', justifyContent: 'center', height: '12vh', paddingTop: '2vh', fontSize: '14px'}}>
        <h1> Classes Selected </h1>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2vh'}}>
        
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', width:'90%' }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>

      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2vh'}}>
        
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', width:'90%' }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>    

      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2vh'}}>
        
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', width:'90%' }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              Heading
            </Typography>
            <Typography>
              This is a media card. You can use this section to describe the
              content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>    

      </div>

      <footer style={{ display: 'flex', justifyContent: 'center', paddingTop: '16vh', fontSize: '15px'}}>
        Total: X credits
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
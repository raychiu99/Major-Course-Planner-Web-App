import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 180, maxHeight:100 }}>
      <CardActionArea href="/">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Account Settings
          </Typography>  
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
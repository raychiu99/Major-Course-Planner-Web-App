import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function LinkCard({ text, path }) {
  return (
    <Card style={{ height: "120px" }}>
      <CardActionArea style={{ height: "100%" }} href={path}>
        <CardContent style={{ height: "100%" }}>
          <div style={{display:'flex', justifyContent: 'center', fontSize: '16px' }}>
            <h2>{text}</h2>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
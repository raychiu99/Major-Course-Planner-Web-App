import React from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useAuth} from '../contexts/AuthContext'
import { useState } from 'react';
const theme = createTheme();

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_wAqPr6COkMcidg-kZ0Od0vXw8BkHVWHuA&usqp=CAU)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h2> How It Works </h2>
            <p> Hi, Banana Slugs!  
              <br/><br/>
              We aim to create a awesome website to help all banana slugs plan their courses out. 
              This app can help recommend class for next quarter based on your status and classes you took. 
              <br/><br/>
              To access all of the functions of this website, you need to create and login into a account. 
              After input all of the class you taken and the class you are taking this quarter, the “Next Quarter Planner” 
              page can give you some recommendations for next quarter. 
              <br/><br/>
              Good luck on your College path!
              <br/>
              
              Made by banana slugs, for UCSC students. </p>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Home;
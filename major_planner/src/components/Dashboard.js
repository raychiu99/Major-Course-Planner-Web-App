import * as React from 'react';
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
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react';
import { Container } from '@mui/material';

import AccountCard from "./AccountSettingsCard";
import SearchBar from "./SearchBar";

const theme = createTheme();




export default function Dashboard() {
    let dashInfo = { // TODO: Replace with actual info
        major: 'Computer Science',
        status: 'Senior',
        catalog: '2018-2019'
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div style={{display: 'flex',  justifyContent:'center', height: '12vh', paddingTop: '5vh'}}>
                    <h1> Welcome Back, usr.firstname usr.lastname! </h1>
                </div>

                <div style={{display: 'flex',  justifyContent:'center', height: '20vh'}}>
                    <SearchBar />
                </div>

                <Grid container spacing={4} >
                    <Grid item xs={4} direction="column">
                        <Paper style={{ height: "100%" }}>TEST</Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Paper>TEST</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper>test</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper>TEST</Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <AccountCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
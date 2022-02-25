import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import LinkCard from "./LinkCard";
import { useUser } from '../contexts/UserContext';
const theme = createTheme();




export default function Dashboard() {
    const { firstName, lastName, major, seniority, catalog } = useUser();

    return ( 
    <div style={{backgroundColor:'#fefcf0',height:'100vh'}}>
        <ThemeProvider theme={theme}>
           
                <div style={{display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '8vh' }}>
                    <h1> Welcome Back, {firstName} {lastName}! </h1>
                </div>
                
                <Container style={{ display: 'flex', justifyContent: 'center', height: '10vh', padding: '50px' }}>
                    <Grid container spacing={3} sx={{ width: '58%', display: 'flex' }}>
                        <Grid item xs={5} direction="column">
                            <Card style={{ height: "100%" }}>
                                <CardContent style={{ height: "100%" }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <h2>Info</h2>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'left', paddingTop: '6px' }}>
                                        <h4>Major</h4>: {major}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'left', paddingTop: '4px' }}>
                                        <h4>Status</h4>: {seniority}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'left', paddingTop: '4px' }}>
                                        <h4>Year</h4>: {catalog}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '14px', fontSize: '15px', paddingBottom: '8px' }}>
                                        <h3>Current Classes</h3>
                                    </div>

                                    some list here

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={7}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <LinkCard text={'Progress Checker'} path={'/Test'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LinkCard text={'Next Quarter Planner'} path={'/NextQuarterPlanner'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LinkCard text={'Update Status'} path={'/Test'} />
                                </Grid>
                                <Grid item xs={6}>
                                    <LinkCard text={'Account Settings'} path={'/AccountSettings'} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            
        </ThemeProvider>
        </div>
    );
}
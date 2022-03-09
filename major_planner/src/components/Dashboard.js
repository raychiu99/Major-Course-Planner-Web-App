import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import gradcap from "./graduationCap.jpg";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LinkCard from "./LinkCard";
import { useUser } from '../contexts/UserContext';
const theme = createTheme();




export default function Dashboard() {
    const classesObj = JSON.parse(localStorage.getItem('user-info'));
    const { firstName, lastName, major, seniority, catalog } = useUser();
    return ( 
    <div style={{backgroundColor:'#fefcf0',height:'100vh'}}>
        <ThemeProvider theme={theme}>
           
                <div style={{display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '8vh' }}>
                    <h1> Welcome Back, {firstName} {lastName}! </h1>
                </div>
                
                <Container style={{ display: 'flex', justifyContent: 'center', height: '10vh', padding: '50px' }}>
                    <Grid container spacing={3} sx={{ width: '58%', display: 'flex' }}>
                        <Grid item xs={5} >
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
                                    {(classesObj.currentClassesArr.length > 0) ?
                                    classesObj.currentClassesArr.map((className)=>(
                                           <div>{className}</div>
                                    ))
                                    :<></>}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3.5} >
                            <Card style={{ height: "100%" }}>
                                <CardActionArea style={{ height: "100%" }} href='/Graduation'>
                                    <img src={gradcap} width="100%" height="29%"/>
                                    <CardContent style={{ height: "100"}}>
                                      <div style={{display:'flex', justifyContent: 'center', height:'100px'}}>
                                          <h2>Graduation Status</h2>
                                      </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={3.5}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <LinkCard text={'Next Quarter Planner'} path={'/NextQuarterPlanner'} />
                                </Grid>
                                <Grid item xs={12}>
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
import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useCourse } from '../contexts/CourseContext';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { ClassNames } from '@emotion/react';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CourseDrawer from './CourseDrawer'


const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const desc = ["a", "b", "c", "d", "e", "f", "g", "h"];


const theme = createTheme();


export default function Planner() {

    const [takenClassArr, setTakenClassArr] = useState([]);

    const [courses, setCourses] = useState([]);
    const dbRef = ref(getDatabase());
    useEffect(() => {
      function fetchCourses(){
        get(child(dbRef, 'Faculties/CSE-Computer-Science-and-Engineering')).then((snapshot) => {
          if(snapshot.exists()) {
            setCourses(snapshot.val());
          } else {
            setCourses(undefined);
          }
        }).catch((error) => {
        console.log(error);
        });
      };
      fetchCourses();
  }, [dbRef]);

  const handleClick = (classObj) => {
    let isTaken = false;
    for (let index in takenClassArr){
      if (takenClassArr[index][0].indexOf(classObj[0]) >= 0){
        isTaken = true;
        break;
      }
    }
    if (!isTaken) {
      console.log('Pushing into classes taken: ', classObj, takenClassArr);
      setTakenClassArr(takenClassArr => [...takenClassArr, classObj])

    }
    else {
      console.log('You already added that class');
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <CourseDrawer classArr = {takenClassArr}/>

      <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '1.5vh', fontSize: '24px'}}>
        <h1> Class Planner </h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '5vh'}}>
        <h2> Major: filler  Status: filler  Year: filler </h2>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '8vh' }}>
        <h3> filler credits until graduation </h3>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '1vh' }}>
        <h3> Recommended classes for next quarter: </h3>
      </div>

      <main>
        
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Object.entries(courses).map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
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

                    <div style={{ display: 'flex', justifyContent: 'left' }}>
                      {card[1]["Requirements"]}
                    </div>

                  </CardContent>
                  <CardActions>
                    <Button size="small" 
                      onClick = {() => {handleClick(card)}}
                    >Add Class</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      
    </ThemeProvider>
  );
}
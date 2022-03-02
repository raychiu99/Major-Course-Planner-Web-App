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
import CourseDrawer from './CourseDrawer';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
const cards = [1, 2, 3, 4, 5, 6, 7, 8];
const desc = ["a", "b", "c", "d", "e", "f", "g", "h"];


const theme = createTheme();


export default function Planner() {
    const {recommendCourses} = useCourse();
    const [takenClassArr, setTakenClassArr] = useState([]);
    const [courses, setCourses] = useState([]);
    const [recommendedArr, setRecommendedArr] = useState([]);
    const dbRef = ref(getDatabase());
    const { firstName } = useUser();
    const [isFetching, setFetching] = useState(false);
    
    
    // Fetch All courses
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
      if (firstName.length === 0) {

      
        setTimeout(()=> {console.log('This message took 2000ms');setFetching(true);}, 2000);
      }
  }, [dbRef]);


    const cardColor = ['#B6D3DB','#FDD5E0','#DCEFE8','#D68D96'];
    if (isFetching === true){
      
      const recommendedClassesArr = recommendCourses();
        for (let i = 0; i < 4; i++){
          
          if (recommendedClassesArr[i].length > 0){
            recommendedClassesArr[i].map((className) => {
            let tempObj = {};
            tempObj[0] = className;
            tempObj[1] = courses[className];
            tempObj[2] = cardColor[i];
            setRecommendedArr((recommendedArr)=> [...recommendedArr, tempObj]);
            })
          }
        }
      setFetching(false);
    }
    

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
      <div style={{backgroundColor:'#fefcf8'}}>
      <CourseDrawer classArr = {takenClassArr}/>

      <div style={{display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '1.5vh', fontSize: '24px'}}>
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
          <List sx={{ width: '100%', height: '100%' }} spacing={2}>
          <ListItem>
            <Button sx = {{backgroundColor: '#B6D3DB', height: '30px'}} disabled = {true}></Button>
            <ListItemText sx ={{ml:'2%'}}>{' Represents the Computer Science Requirements (Lower and Upper division)'}</ListItemText>
          </ListItem>
          <ListItem>
            <Button sx = {{backgroundColor: '#FDD5E0', height: '30px'}} disabled = {true}></Button>
            <ListItemText sx ={{ml:'2%'}}>{'Represents the DC Requirement'}</ListItemText>
          </ListItem>
          <ListItem>
            <Button sx = {{backgroundColor: '#DCEFE8', height: '30px'}} disabled = {true}></Button>
            <ListItemText sx ={{ml:'2%'}}>{'Represents the Capstone Requirement'}</ListItemText>
          </ListItem>
          <ListItem>
            <Button sx = {{backgroundColor: '#D68D96', height: '30px'}} disabled = {true}></Button>
            <ListItemText sx ={{ml:'2%'}}>{'Represents the Computer Science Electives'}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{"If you don't see a class with any of the colors that means you have already fulfilled that requirement"}</ListItemText>
          </ListItem>
          </List>
          {/* End hero unit */}
          {(recommendedArr.length <= 0) ? 
                <Grid container spacing={2}>
                {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                  <Skeleton variant="rectangular" width={250} height={250} />
                  </Grid>
                ))
                }
                </Grid>
            
            :
            <Grid container spacing={4}>
            {recommendedArr.map((card, index) => (
              console.log('current card: ', card, 'card[1]: ', card[1]["Class Name"]),
                <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column',
                  backgroundColor : card[2]}}
                  
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'left', height: '41px'}}>
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
        
        }
          </Container>
      </main>
      </div>
    </ThemeProvider>
  );
}
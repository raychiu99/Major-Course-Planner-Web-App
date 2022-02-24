import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCourse } from '../contexts/CourseContext';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { ClassNames } from '@emotion/react';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Delete from '@mui/icons-material/Delete';
import { IconButton, Typography } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function BasicList(props) {
  const history = useHistory();
  const {currentUser} = useAuth();
  const {insertAllCourses} = useCourse();
  const dbRef = ref(getDatabase());
  const [classesTaken, setClassesTaken] = useState([]);
  const [anew, setdelete] = useState(props.classArr);

  const handleremove= (classObj) => { 
    const newList = classesTaken.filter((className) => className!== classObj);
    setClassesTaken(newList);
    for (let index in props.classArr){
      if (props.classArr[index][0] === classObj){  
        props.classArr.splice(index,1);
        console.log('Classes taken arr',props.classArr);
      }
    }
}
  React.useEffect (() => {
    for (let index in props.classArr){
      if (classesTaken.indexOf(props.classArr[index][0]) < 0){     
        const classObj = props.classArr[index][0];
        setClassesTaken(classesTaken=>[...classesTaken,classObj]);
      }
    } 
  }, [props.classArr]); 
  console.log('Classes taken arr', classesTaken);
  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        {(classesTaken !== undefined) ?
        <List>
          <Typography variant='h4'>Classes Taken</Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 8, md: 12 }}>
          {classesTaken.map((className) => { 
              return (
              <Grid item xs={2} sm={4} md={4} >
                <ListItem divider={true}>
                <ListItemText>{className}</ListItemText>
                <IconButton type="button" onClick = {() => {handleremove(className)}}>
                <DeleteIcon/>
                </IconButton> 
                </ListItem>
              </Grid> 
               );
          })}
          </Grid>
        </List> : <></> }
        <Button color = 'secondary' variant='contained' onClick = {() => {insertAllCourses(props.classArr);
        history.push("/home")
        }}
        sx={{mt: '5%', mb:'2%'}}
        >DONE</Button>
      </nav>
    </Box>
  );
}

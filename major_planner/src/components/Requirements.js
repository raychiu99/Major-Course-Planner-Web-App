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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function BasicList(props) {
  const {currentUser} = useAuth();
  const {insertAllCourses} = useCourse();
  const dbRef = ref(getDatabase());
  const [classesTaken, setClassesTaken] = useState([]);
  const handleremove= (classObj) => { 
    const newList = classesTaken.filter((className) => className!== classObj);
    setClassesTaken(newList);
    console.log(newList,classesTaken);
  }
  React.useEffect (() => {
    console.log('test1: ', props);
    console.log('test1: ', props.classArr);
    insertAllCourses(props.classArr);
    function fetchCourses(){
      get(child(dbRef, 'Users/'+currentUser.uid)).then((snapshot) => {
        console.log('test1: ', snapshot);
        if(snapshot.exists()) {
          setClassesTaken(snapshot.val().classesTaken);
        } else {
          setClassesTaken(undefined);
        }
      }).catch((error) => {
      console.log(error);
      });
    };
    fetchCourses();
  }, [insertAllCourses,props.classArr, dbRef, currentUser.uid]); 
  console.log('Classes taken arr', classesTaken);
  
  
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        {(classesTaken !== undefined) ?
        <List>
          <b>Classes Taken</b>
          {classesTaken.map((className) => {
            return(
              <React.Fragment key={className}>
              <Stack direction="row" spacing={2}>
              <ListItem key = {className} ><button type="button" onClick = {() => {handleremove(className)}}>x</button> 
              
              <Item>{className}</Item>
              </ListItem>
              </Stack>
              </React.Fragment>
            );
          })}
        </List> : <></> }
      </nav>
      <Divider />
    </Box>
  );
}

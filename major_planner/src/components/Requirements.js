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
export default function BasicList(props) {
  const {currentUser} = useAuth();
  const {insertAllCourses} = useCourse();
  const dbRef = ref(getDatabase());
  const [classesTaken, setClassesTaken] = useState([]);
  const [name, setnewlist] = useState([]);
  const handleremove= (classObj) => { 
    const newList = classesTaken.filter((className) => className!== classObj);
    setClassesTaken(newList);
    console.log(newList,classesTaken);
  }
  React.useEffect (() => {
    insertAllCourses(props.classArr);
    function fetchCourses(){
      get(child(dbRef, 'Users/'+currentUser.uid)).then((snapshot) => {
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
              <ListItem key = {className} ><button type="button" onClick = {() => {handleremove(className)}}>x</button> 
              <ListItemText primary={className}/>
              </ListItem>
            );
          })}
        </List> : <></> }
        
      </nav>
      <Divider />
    </Box>
  );
}

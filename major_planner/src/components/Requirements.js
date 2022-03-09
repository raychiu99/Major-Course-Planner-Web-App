import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCourse } from '../contexts/CourseContext';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { IconButton, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
export default function BasicList(props) {
  const history = useHistory();
  const { insertAllCourses } = useCourse();
  const [classesTaken, setClassesTaken] = useState([]);

  // Delete a class from the list
  const handleremove = (classObj) => {
    const newList = classesTaken.filter((className) => className !== classObj);
    setClassesTaken(newList);
    for (let index in props.classArr) {
      if (props.classArr[index][0] === classObj) {
        props.classArr.splice(index, 1);
        console.log('Classes taken arr', props.classArr);
      }
    }
  }
  // Fetch once the classes given as a prop
  React.useEffect(() => {
    for (let index in props.classArr) {
      // If the class is not in the array add it.
      // [index][0] means get the code of the class (CSE 101)
      // otherwise [index][1] means get all the information of the class
      if (classesTaken.indexOf(props.classArr[index][0]) < 0) {
        const classObj = props.classArr[index][0];
        setClassesTaken(classesTaken => [...classesTaken, classObj]);
      }
    }
  }, [props.classArr]);

  // Loop through the array of classes and output them
  return (
    <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper', backgroundColor: '#fefcf0' }}>
      <nav aria-label="main mailbox folders">
        {(classesTaken !== undefined) ?
          <List>
            <Typography variant='h4'>Classes Taken</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 8, md: 12 }}>
              {classesTaken.map((className) => {
                return (
                  <Grid item key={className} xs={2} sm={4} md={4}>
                    <ListItem divider={true} sx={{ backgroundColor: '#fefcd0' }}>
                      <ListItemText>{className}</ListItemText>
                      <IconButton type="button" onClick={() => { handleremove(className) }}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  </Grid>
                );
              })}
            </Grid>
          </List> : <></>}
        <Button color='secondary' variant='contained' onClick={() => {
          if (props.classArr.length > 0) {
            insertAllCourses(props.classArr, false);
          }

          history.push("/home")
        }}
          sx={{ mt: '5%', mb: '2%' }}
        >DONE</Button>
      </nav>
    </Box>
  );
}

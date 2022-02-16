
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {database} from '../firebase-config';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
import { useState, useEffect } from 'react';
export default function BasicList(props) {
    console.log('current Faculty: ',props.faculty);
    const dbRef = ref(getDatabase());
    const [courses, setCourses] = useState([]);
    /** Fetch the data ONCE using the useEffect hook to get object of courses
     *  use the props passed from the drop down menu
     *  use setState to define an array that contains objects so that they can be displayed
    */
    useEffect(() => {
        function fetchCourses(){
            if (props.faculty !== ''){
            get(child(dbRef, 'Faculties/'+props.faculty)).then((snapshot) => {
              if(snapshot.exists()) {
                console.log('Faculties/'+props.faculty);
                  setCourses(snapshot.val());
                  console.log('Snapshot: ',snapshot.val());
        
              } else {
                setCourses(undefined);
              }
          }).catch((error) => {
              console.log(error);
          });
            }
          };
          fetchCourses();
    }, [dbRef, props.faculty]);
    return (
        <List>
        {
            Object.entries(courses).map((key,value) => {
                //console.log(key[0], key[1]);
                /** key[0] = Name of course
                 * key[1] = Object containing all the information
                 */
                return(
                <List key = {value}> {key[0]}
                    {
                        /** Loop through the object containing the information
                         * display the name of the key 'k'
                         * and display the value at position key[1][k]
                         */
                        Object.keys(key[1]).map((k, v)=> (
                            <ListItem key = {v}> {<b>{k+': '}</b>}{key[1][k]}</ListItem>
                        ))
                    }
                </List>
                );
            })  
        }
        </List>
    );
}
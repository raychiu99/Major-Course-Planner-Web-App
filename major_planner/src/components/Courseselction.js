import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
import { useState, useEffect } from 'react';
import "../Course.css";
function Course(){
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
    const name = Object.entries(courses).map((key,val) => {<li key = {key}>{key[1]['Class Name']}</li>})
    const [searchterm, setsearchterm] = useState("")
    return (
        <div className="Course">
            <h1>START BY ADDING THE CLASS YOU'VE TAKEN</h1>
            <input 
                type = "text" 
                placeholder="Look up the classes by code"
                onChange={(event) => {
                    setsearchterm(event.target.value);
                }}
            />
            {Object.entries(courses).filter((key) => {
                if(searchterm == ""){
                    return key
                }else if (key[1]['Class Name'].toLowerCase().includes(searchterm.toLowerCase())){
                    return key[1]['Class Name']
                }
            }).map((key,val) => {
                return (
                    <div className = "cc" key = {key}>
                        <p>{key[1]['Class Name']}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default Course;


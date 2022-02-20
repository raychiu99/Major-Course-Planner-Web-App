import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
import { useState, useEffect } from 'react';
import "../Course.css";
import BasicList from './Requirements.js';
function Course(){
  const [courses, setCourses] = useState([]);
  const [showTakenClasses, toggleTakenClasses] = useState(false);
  const [takenClassArr, setTakenClassArr] = useState([]);
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
  const [searchterm, setsearchterm] = useState("");
  const handleToggle = () => {
    toggleTakenClasses(!showTakenClasses);
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
              {// Class Name is the key of a query, so key[0] = CSE 13S and key[1]
               // is the object containing all the information
              }
              <button onClick = {() => {handleClick(key)}}>{key[1]['Class Name']}</button>
            </div>
          );
        })}
        <button onClick = {() => {handleToggle()}}>DONE</button>
      {(showTakenClasses === true) ? <BasicList classArr = {takenClassArr}/> : <></>}
      
    </div>
  );
}
export default Course;


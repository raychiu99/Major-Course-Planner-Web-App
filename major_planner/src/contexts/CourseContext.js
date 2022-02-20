import React, { useContext, useState, useEffect } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useUser} from '../contexts/UserContext';import { get, getDatabase, ref,update,child } from "firebase/database";

const CourseContext = React.createContext();
export function useCourse() {
    return useContext(CourseContext);
}
export function CourseProvider({children}){

  const db = getDatabase();
  const { currentUser } = useAuth();
  const [classes, setClasses] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [electives, setElectives] = useState([]);
  const [dc, setDc] = useState([]);
  const [capstone, setCapstone] = useState([]);
  const [credits, setCredits] = useState(0);
    let totalCredits = 0;
    let studentClassObj = {"classesTaken" : [], "requirementsTaken" : [],"electivesTaken" : [],
    "dcTaken" : [], "capstoneTaken" : [], "creditsTaken" : 0, "otherElectivesTaken" : 0};
    const csReqs = [
        "MATH 19A", "MATH 20A", "MATH 19B", "MATH 20B", "AM 10", "MATH 21",
        "AM 30", "MATH 23A", "CSE 16", "CSE 20", "CSE 12/L", "CSE 13S",
        "CSE 13E", "CSE 30", "CSE 101", "CSE 120", "CSE 112", "CSE 114",
        "CSE 116", "CSE 102", "CSE 103", "CSE 130", "CSE 131", "CSE 107",
        "CSE 131"
    ];
    // contains other reqs like the DC requirements
    const allReqs = [
        "MATH 19A", "MATH 20A", "MATH 19B", "MATH 20B",
        "AM 10", "MATH 21", "AM 30", "MATH 23A", "CSE 16",
        "CSE 20", "CSE 12/L", "CSE 13S", "CSE 13E", "CSE 30",
        "CSE 101", "CSE 120", "CSE 112", "CSE 114", "CSE 116",
        "CSE 102", "CSE 103", "CSE 130", "CSE 131", "CSE 107",
        "CSE 131", "CSE 115A", "CSE 185", "CSE 195(F)", "CSE 115A",
        "CSE 185E", "CSE 185S"
      ];
    // Electives that are not from the CS department but can stil satisfy regular electives
      const otherElectives = ['AM 114', 'AM 147', 'MATH 110', 'MATH 115', 'MATH 116',
    'MATH 117', 'MATH 118', 'MATH 134', 'MATH 145(L)', 'MATH 148(L)', 'MATH 160',
    'MATH 161', 'STAT 132','CMPM 120', 'CMPM 131', 'CMPM 146', 'CMPM 163',
    'CMPM 164(L)', 'CMPM 171', 'CMPM 172'];

    const dcReqs = ['CSE 115A','CSE 185E', 'CSE 185S', 'CSE 195(F)'];
    let capstoneReq = ["CSE 110B",
    "CSE 115C", "CSE 115D", "CSE 118", "CSE 121",
    "CSE 138", "CSE 140", "CSE 143", "CSE 144",
    "CSE 156", "CSE 157", "CSE 160", "CSE 161",
    "CSE 162", "CSE 163", "CSE 168", "CSE 181",
    "CSE 183", "CSE 184", "CMPM 172", "ECE 118"
    ];
    function insertAllCourses (courseObj){
      console.log('coures Object in insertAll Courses',courseObj);
      let totalCount = 0;
      for (let index in courseObj){
        // Avoid adding duplicates
        // When clicking on the Done button multiple times the values
        // from the current logged in user are being added.
        if (studentClassObj.classesTaken.indexOf(courseObj[index][0]) < 0) {
        studentClassObj.classesTaken.push(courseObj[index][0]);
        setReqCompleted(studentClassObj, courseObj[index][0]);
        setElectivesTaken(studentClassObj, courseObj[index][0]);
        setOtherElectives(studentClassObj, courseObj[index][0]);
        setDCReqs(studentClassObj, courseObj[index][0]);
        setCapstoneReqs(studentClassObj, courseObj[index][0]);
        totalCredits += parseInt(courseObj[index][1].Credits);
        studentClassObj.creditsTaken = totalCredits;
        console.log('studentClass Object before updating',studentClassObj);
        update(ref(db,'Users/'+currentUser.uid), {
         classesTaken: studentClassObj.classesTaken,
         requirementsTaken: studentClassObj.requirementsTaken,
         electivesTaken: studentClassObj.electivesTaken,
         dcTaken: studentClassObj.dcTaken,
         capstoneTaken: studentClassObj.capstoneTaken,
         creditsTaken: totalCredits
      });
        
        } else {
          console.log('class was already there')
        }
       }
       
    }
    function setReqCompleted(obj, classTaken) {
      
        if (csReqs.indexOf(classTaken) >= 0) {
          console.log('Pushing: ', classTaken, ' to the requirements taken');
          obj.requirementsTaken.push(classTaken);
        }
      
    }
    function setElectivesTaken(obj, classTaken) {
      
        // Elective classes are in the range [100-170], [180-189], [195]
        // but courses in the DC requirements (CSE 115A , CSE 185E/S , CSE 195) cant be classified as electives
        // CSE 195 can be an elective but only if it's not completing the DC requirement
        // That edge case will be taken into account later once all the requirements have been checked.
        // Strings in js are compared character by character
        // so if we have CSE 12 and CSE 100, CSE 12 will be bigger than CSE 100
        // Based on our data strings need to have at least 7 characters to be in the range
        // CSE 100 and on (white space still counts as a character), so we need to set for
        // strings starting at least at length 7, (CSE 100, CSE 180, etc.)
        console.log('Elective looking at class: ', classTaken);
        if ((
            (classTaken >= 'CSE 100' && classTaken <= 'CSE 170' && classTaken !== 'CSE 115A') ||
            (classTaken >= 'CSE 180' && classTaken <= 'CSE 189')) &&
            (allReqs.indexOf(classTaken) < 0 && classTaken.length > 6 &&
            classTaken.includes('CSE'))) {
              console.log('pushing elective class: ', classTaken);
              console.log('class taken: ', classTaken, (classTaken.length));
              obj.electivesTaken.push(classTaken);
        }
        else {
          console.log('Class: ', classTaken, ' is not an elective')
        }
    }
    function setOtherElectives(obj, classTaken){
      console.log('otherElectives Classes',classTaken)
      
        console.log('look at class: ',classTaken,
          'index of: ', otherElectives.indexOf(classTaken));
        if (otherElectives.indexOf(classTaken) >= 0 && obj.otherElectivesTaken < 2){
          console.log('pushing into other electives: ', classTaken);
          obj.electivesTaken.push(classTaken)
          obj.otherElectivesTaken = parseInt(obj.otherElectivesTaken) + 1;
        }
    }
    function setDCReqs(obj, classTaken) {
        if (dcReqs.indexOf(classTaken) >= 0){
          console.log('Pushing into DC Reqs: ', classTaken);
          obj.dcTaken.push(classTaken);
        }
      // From the catalog if there is more than one course and one of then
      // is CSE 195(F) we can move it to electives as CSE 195(F) is the only class
      // from the DC that can be an elective OR a DC
      let index = obj.dcTaken.indexOf('CSE 195(F)');
      if (obj.dcTaken.length > 1 && index >= 0){
          obj.electivesTaken.push('CSE 195(F)');
          obj.dcTaken.splice(index,1);
      }
    }
    function setCapstoneReqs(obj, classTaken) {
      
        if (capstoneReq.indexOf(classTaken) >= 0){
          console.log('Pushing into capstone', classTaken);
          obj.capstoneTaken.push(classTaken);
        }
    }
    return (
      <CourseContext.Provider value = {{insertAllCourses,  classes, requirements,
        electives, dc, capstone, credits }}>
        {children}
      </CourseContext.Provider>
    );
}
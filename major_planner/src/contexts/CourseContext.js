import React, { useContext, useState, useEffect } from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useUser} from '../contexts/UserContext';
import { get, set,getDatabase, ref,update,child } from "firebase/database";

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
  let {classesTaken} = useUser();
  let {dcTaken} = useUser();
  let {electivesTaken} = useUser();
  let {capstoneTaken} = useUser();
  let {email} = useUser();
  let {firstName} = useUser();
  let {lastName} = useUser();
  let {major} = useUser();
  let {seniority} = useUser();
  let {catalog} = useUser();
  let {currentClasses} = useUser();
  let {password} = useUser();
  let {requirementsTaken} = useUser();
  let {creditsTaken} = useUser();
  let totalCredits = 0;
    
    let studentClassObj = {"classesTaken" : [], "requirementsTaken" : [],"electivesTaken" : [],
    "dcTaken" : [], "capstoneTaken" : [], "creditsTaken" : 0, "otherElectivesTaken" : 0};
    const csReqs = [
        "MATH 19A", "MATH 20A", "MATH 19B", "MATH 20B", "AM 10", "MATH 21",
        "AM 30", "MATH 23A", "CSE 16", "CSE 20", "CSE 12", "CSE 13S", "CSE 30", "CSE 101", "CSE 120", "CSE 112", "CSE 114A", "CSE 102", "CSE 103", "CSE 130", "CSE 107"
    ];
    // contains other reqs like the DC requirements
    const allReqs = [
        "MATH 19A", "MATH 20A", "MATH 19B", "MATH 20B",
        "AM 10", "MATH 21", "AM 30", "MATH 23A", "CSE 16",
        "CSE 20", "CSE 12", "CSE 13S", "CSE 30",
        "CSE 101", "CSE 120", "CSE 112", "CSE 114A",
        "CSE 102", "CSE 103", "CSE 130", "CSE 107",
         "CSE 115A", "CSE 195(F)", "CSE 115A",
        "CSE 185E"
      ];
    const electiveReqs = [ 'CSE 104', 'CSE 106','CSE 108', 'CSE 110A', 'CSE 110B', 'CSE 111','CSE 113', 'CSE 114A',
    'CSE 115B', 'CSE 115C', 'CSE 115D','CSE 117', 'CSE 118', 'CSE 119', 'CSE 121', 'CSE 122', 'CSE 123A', 'CSE 123B', 'CSE 125',
    'CSE 129A','CSE 129B','CSE 129C','CSE 132','CSE 134','CSE 138','CSE 140', 'CSE 142', "CSE 143", "CSE 144", "CSE 150(L)", "CSE 151(L)",
    "CSE  152","CSE 156(L)", "CSE 157", "CSE 160(L)", "CSE 161(L)","CSE 162(L)", "CSE 163", "CSE 168", "CSE 180" ,"CSE 181", "CSE 182", "CSE 183", "CSE 184",
    ];
    // Electives that are not from the CS department but can stil satisfy regular electives
      const otherElectives = ['AM 114', 'AM 147', 'MATH 110', 'MATH 115', 'MATH 116',
    'MATH 117', 'MATH 118', 'MATH 134', 'MATH 145(L)', 'MATH 148(L)', 'MATH 160',
    'MATH 161', 'STAT 132','CMPM 120', 'CMPM 131', 'CMPM 146', 'CMPM 163',
    'CMPM 164(L)', 'CMPM 171', 'CMPM 172'];

    const dcReqs = ['CSE 115A','CSE 185E', 'CSE 195(F)'];
    let capstoneReq = ["CSE 110B",
    "CSE 115C", "CSE 115D", "CSE 118", "CSE 121",
    "CSE 138", "CSE 140", "CSE 143", "CSE 144",
    "CSE 156(L)", "CSE 157", "CSE 160(L)", "CSE 161(L)",
    "CSE 162(L)", "CSE 163", "CSE 168", "CSE 181",
    "CSE 183", "CSE 184", "CMPM 172", "ECE 118"
    ];
    function insertAllCourses (courseObj){
      console.log('coures Object in insertAll Courses',courseObj);
      // let totalCount = 0;
      for (let index in courseObj){
        // Avoid adding duplicates
        // When clicking on the Done button multiple times the values
        // from the current logged in user are being added.
        if (studentClassObj.classesTaken.indexOf(courseObj[index][0]) < 0) {
          if (Array.isArray(classesTaken)) {
            classesTaken.push(courseObj[index][0])
          } else {
            classesTaken = [courseObj[index][0]];
          }
          // studentClassObj.classesTaken.push(courseObj[index][0]);
          setReqCompleted(studentClassObj, courseObj[index][0]);
          setElectivesTaken(studentClassObj, courseObj[index][0]);
          setOtherElectives(studentClassObj, courseObj[index][0]);
          setDCReqs(studentClassObj, courseObj[index][0]);
          setCapstoneReqs(studentClassObj, courseObj[index][0]);
          if (Array.isArray(requirementsTaken) && studentClassObj.requirementsTaken[0] !== undefined) {
            requirementsTaken.push(courseObj[index][0]);
          } else if (studentClassObj.requirementsTaken[0] !== undefined){
            requirementsTaken = [courseObj[index][0]];
          }

          if (Array.isArray(electivesTaken) && studentClassObj.electivesTaken[0] !== undefined) {
            electivesTaken.push(courseObj[index][0]);
          } else if (studentClassObj.electivesTaken[0] !== undefined){
            electivesTaken = [courseObj[index][0]];
          }

          if (Array.isArray(dcTaken) && studentClassObj.dcTaken[0] !== undefined) {
            dcTaken.push(courseObj[index][0]);
          } else if (studentClassObj.dcTaken[0] !== undefined){
            dcTaken = [courseObj[index][0]];
          }

          if (Array.isArray(capstoneTaken)&& studentClassObj.capstoneTaken[0] !== undefined) {
            capstoneTaken.push(courseObj[index][0]);
          } else if (studentClassObj.capstoneTaken[0] !== undefined){
            capstoneTaken = [courseObj[index][0]];
          }
          // totalCredits = parseInt(creditsTaken)
          // console.log('Total Credits: ', totalCredits);
          totalCredits += parseInt(courseObj[index][1].Credits);
          studentClassObj.creditsTaken = totalCredits;
          update(ref(db,'Users/'+currentUser.uid), {
          classesTaken:  classesTaken,
          requirementsTaken: requirementsTaken,
          electivesTaken: electivesTaken,
          dcTaken: dcTaken,
          capstoneTaken: capstoneTaken,
          creditsTaken: (parseInt(creditsTaken) + totalCredits)
        },{merge : true});
        
        } else {
          console.log('class was already there')
        }
       }
       
    }
    function setReqCompleted(obj, classTaken) {
      
        if (csReqs.indexOf(classTaken) >= 0) {
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
        if ((
            (classTaken >= 'CSE 100' && classTaken <= 'CSE 170' && classTaken !== 'CSE 115A') ||
            (classTaken >= 'CSE 180' && classTaken <= 'CSE 189')) &&
            (allReqs.indexOf(classTaken) < 0 && classTaken.length > 6 &&
            classTaken.includes('CSE') && classesTaken !== 'CSE 13S')) {
              console.log('pushing elective class: ', classTaken);
              console.log('class taken: ', classTaken, (classTaken.length));
              obj.electivesTaken.push(classTaken);
        }
        else {
          console.log('Class: ', classTaken, ' is not an elective')
        }
    }
    function setOtherElectives(obj, classTaken){
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
    function recommendCourses() {
      let recommendedArr = []
      let reqsRecArr = [];
      let dcRecArr = [];
      let capstoneRecArr = [];
      let electivesRecArr = [];
      if(classesTaken.length > 0){
        recommendRequirements(reqsRecArr)
        recommendDC(dcRecArr);
        recommendCapstone(capstoneRecArr);
        recommendElectives(electivesRecArr)
        recommendedArr.push(reqsRecArr);
        recommendedArr.push(dcRecArr);
        recommendedArr.push(capstoneRecArr);
        recommendedArr.push(electivesRecArr);

      }
      console.log('Recommendations: ', recommendedArr)
      return recommendedArr;
    }
    function recommendRequirements(recommendations) {
      // classesTaken = array of arrays
      // classesTaken[0] = array containing classes
      // Don't recommend requirements that have already been taken
      const filteredArr = csReqs.filter((className) => classesTaken.indexOf(className) < 0);
      // Filter classes that dont need to be taken from requirements
      // You need to take math 19A OR math 20A so it wouldn't make sense to recommend 20A if 19A was taken or viceversa
      // Not sure if I should make it into two if statements where filtering for 19A abd 19B
      // Cant take math 20B if you dont take math 20A
      
      if (classesTaken.indexOf('MATH 19A') >= 0){
        const index = filteredArr.indexOf('MATH 20A');
        if (index >= 0){
          filteredArr.splice(index,1);
        }
        const honorsCalcIndex = filteredArr.indexOf('MATH 20B');
        // Cant take math 20B without math 20A
        if (honorsCalcIndex >= 0) {
          filteredArr.splice(honorsCalcIndex,1);
        }
      }
      // No need to take math 19A if you took the equivalent class already (MATH 20A)
      else if (classesTaken.indexOf('MATH 20A') >= 0) {
        const index = filteredArr.indexOf('MATH 19A');
        if (index >= 0){
          filteredArr.splice(index,1);
        }
      }
      // Recommend either AM  10 or MATH 21
      let index = classesTaken.indexOf('AM 10');
      if (index >= 0) {
        let removeClassIdx = filteredArr.indexOf('MATH 21');
        if (removeClassIdx >= 0) {
          filteredArr.splice(removeClassIdx,1);
        }
      }
      index = classesTaken.indexOf('MATH 21');
      if (index >= 0) {
        let removeClassIdx = filteredArr.indexOf('AM 10');
        if (removeClassIdx >= 0) {
          filteredArr.splice(removeClassIdx,1);
        }
      }
      // Recommend either AM 30 or MATH 23A
      index = classesTaken.indexOf('AM 30');
      if (index >= 0) {
        let removeClassIdx = filteredArr.indexOf('MATH 23A');
        if (removeClassIdx >= 0) {
          filteredArr.splice(removeClassIdx,1);
        }
      }
      index = classesTaken.indexOf('MATH 23A');
      if (index >= 0) {
        let removeClassIdx = filteredArr.indexOf('AM 30');
        if (removeClassIdx >= 0) {
          filteredArr.splice(removeClassIdx,1);
        }
      }
      // Look for CS requirements needed to take CSE 101
      ['CSE 12', 'CSE 13S', 'CSE 16', 'CSE 30'].map(course => {
        const courseIdx = filteredArr.indexOf(course);
        if (courseIdx >= 0){
          recommendations.push(course);
          filteredArr.splice(courseIdx, 1);
        }
      })
      index = filteredArr.indexOf('MATH 19B');
      if (index >= 0){
        recommendations.push('MATH 19B');
        filteredArr.splice(index, 1);
      }
      index = filteredArr.indexOf('MATH 20B');
      if (index >= 0){
        recommendations.push('MATH 20B');
        filteredArr.splice(index, 1);
      }
      index = filteredArr.indexOf('CSE 101');
      // At this point we have only pushed the requirements need for CSE 101 to the recommendation array
      // If none of those classes where pushed that means they were taken already and you can take CSE 101
      if (index >= 0 && recommendations.length ===  0){
          recommendations.push('CSE 101');
          filteredArr.splice(index,1);
      }

      // Can take CSE 120 after taking CSE 12 and CSE 13S
      index = filteredArr.indexOf('CSE 12');
      if (index >= 0 && filteredArr.indexOf('CSE 13S') >= 0){
        recommendations.push('CSE 120')
      }
      // For now just add the first 4 elements of the filtered array
      // If cse 101 Has been taken already then recommend any of the requirements
      if (filteredArr.indexOf('CSE 101') < 0){
        while (recommendations.length < 6 && filteredArr.length > 0) {
          recommendations.push(filteredArr[0]);
          filteredArr.splice(0,1);
        }
      }
    }
    
    function recommendDC(recommendations) {
      if (Array.isArray(dcTaken) === false) {
        for (const dcClass of dcReqs){ 
          recommendations.push(dcClass);
        }
      }
    }

    function recommendCapstone(recommendations) {
      if (Array.isArray(capstoneTaken) === false) {
        
        for (let i = 0; i < 6; i++){
          let randomizedItem = capstoneReq[Math.floor(Math.random() * capstoneReq.length)];
          if (recommendations.indexOf(randomizedItem) < 0) {
            recommendations.push(randomizedItem);
          }
          
        }
      }
    }

    function recommendElectives(recommendations) {
      
      for (let i = 0; i < 3; i++){
        let randomizedItem = electiveReqs[Math.floor(Math.random() * electiveReqs.length)];
        if (recommendations.indexOf(randomizedItem) < 0) {
          recommendations.push(randomizedItem);
        }
        randomizedItem = otherElectives[Math.floor(Math.random() * 3)];
        if (recommendations.indexOf(randomizedItem) < 0) {
          recommendations.push(randomizedItem);
        }
      }
        
      
    }

    return (
      <CourseContext.Provider value = {{insertAllCourses,  recommendCourses,classes, requirements,
        electives, dc, capstone, credits }}>
        {children}
      </CourseContext.Provider>
    );
}
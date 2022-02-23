import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import BasicList from './Requirements.js';
import { useState, useEffect } from 'react';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
export default function ComboBox() {
const [courses, setCourses] = useState([]);
const [takenClassArr, setTakenClassArr] = useState([]);
const [showTakenClasses, toggleTakenClasses] = useState(false);
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
const cao = Object.entries(courses);
const handleToggle = () => {
  toggleTakenClasses(!showTakenClasses);
}
const handleClick = (classname,sname) => {
  console.log('Pushing into classes taken: ', takenClassArr);
  let isTaken = false;
  for (let index in takenClassArr){
    if (takenClassArr[index][0].indexOf(sname) >= 0){
      isTaken = true;
      break;
    }
  }
    if (!isTaken) {
      for (let index in cao){
        if (cao[index][1]['Class Name'] == classname){
          console.log('Pushing into classes taken: ', takenClassArr);
          const classObj = cao[index];
          setTakenClassArr(takenClassArr => [...takenClassArr, classObj]);
        }
      }
    }
    else {
      console.log('You already added that class');
    }
  }
  return (
    <div className="Course">
    <h1>START BY ADDING THE CLASS YOU'VE TAKEN</h1>
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cseclasses}
      sx={{ width: 500 }}
      onChange={(event,value) =>{ {(value!= null) ? handleClick(value.label,value.name) : <></>}}}
      renderInput={(params) => <TextField {...params} label="Class" />}
    />
    <BasicList classArr = {takenClassArr}/> 
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const cseclasses = [
  {  name : 'AM 114', label : 'AM 114 Introduction to Dynamical Systems'},
  {  name : 'AM 147', label : 'AM 147 Computational Methods and Applications'},
  {  name : 'CMPM 120', label : 'CMPM 120 Game Development Experience'},
  {  name : 'CMPM 131', label : 'CMPM 131 User Experience for Interactive Media'},
  {  name : 'CMPM 146', label : 'CMPM 146 Game AI'},
  {  name : 'CMPM 163', label : 'CMPM 163 Game Graphics and Real-Time Rendering'},
  {  name : 'CMPM 164', label : 'CMPM 164 Game Engines'},
  {  name : 'CMPM 171', label : 'CMPM 171 Game Design Studio II'},
  {  name : 'CMPM 172', label : 'CMPM 172 Game Design Studio III'},
  {  name : 'CSE 10', label : 'CSE 10 Introduction to Computer Science'},
  {  name : 'CSE 100', label : 'CSE 100 Logic Design'},
  {  name : 'CSE 101', label : 'CSE 101 Introduction to Data Structures and Algorithms'},
  {  name : 'CSE 102', label : 'CSE 102 Introduction to Analysis of Algorithms'},
  {  name : 'CSE 103', label : 'CSE 103 Computational Models'},
  {  name : 'CSE 104', label : 'CSE 104 Computability and Computational Complexity'},
  {  name : 'CSE 106', label : 'CSE 106 Applied Graph Theory and Algorithms'},
  {  name : 'CSE 107', label : 'CSE 107 Probability and Statistics for Engineers'},
  {  name : 'CSE 108', label : 'CSE 108 Algorithmic Foundations of Cryptography'},
  {  name : 'CSE 110A', label : 'CSE 110A Fundamentals of Compiler Design I'},
  {  name : 'CSE 110B', label : 'CSE 110B Fundamentals of Compiler Design II'},
  {  name : 'CSE 111', label : 'CSE 111 Advanced Programming'},
  {  name : 'CSE 112', label : 'CSE 112 Comparative Programming Languages'},
  {  name : 'CSE 113', label : 'CSE 113 Parallel and Concurrent Programming'},
  {  name : 'CSE 114A', label : 'CSE 114A Foundations of Programming Languages'},
  {  name : 'CSE 114B', label : 'CSE 114B Functional Programming'},
  {  name : 'CSE 115A', label : 'CSE 115A Introduction to Software Engineering'},
  {  name : 'CSE 115B', label : 'CSE 115B Software Design Project'},
  {  name : 'CSE 115C', label : 'CSE 115C Software Design Project II'},
  {  name : 'CSE 115D', label : 'CSE 115D Software Design Project - Accelerated'},
  {  name : 'CSE 117', label : 'CSE 117 Open Source Programming'},
  {  name : 'CSE 118', label : 'CSE 118 Mobile Applications'},
  {  name : 'CSE 119', label : 'CSE 119 Software for Society'},
  {  name : 'CSE 12', label : 'CSE 12 Computer Systems and Assembly Language and Lab'},
  {  name : 'CSE 120', label : 'CSE 120 Computer Architecture'},
  {  name : 'CSE 121', label : 'CSE 121 Embedded System Design'},
  {  name : 'CSE 122', label : 'CSE 122 Introduction to VLSI Digital System Design'},
  {  name : 'CSE 123A', label : 'CSE 123A Engineering Design Project I'},
  {  name : 'CSE 123B', label : 'CSE 123B Engineering Design Project II'},
  {  name : 'CSE 125', label : 'CSE 125 Logic Design with Verilog'},
  {  name : 'CSE 129A', label : 'CSE 129A Capstone Project I'},
  {  name : 'CSE 129B', label : 'CSE 129B Capstone Project II'},
  {  name : 'CSE 129C', label : 'CSE 129C Capstone Project III'},
  {  name : 'CSE 130', label : 'CSE 130 Principles of Computer Systems Design'},
  {  name : 'CSE 132', label : 'CSE 132 Computer Security'},
  {  name : 'CSE 134', label : 'CSE 134 Embedded Operating Systems'},
  {  name : 'CSE 138', label : 'CSE 138 Distributed Systems'},
  {  name : 'CSE 13S', label : 'CSE 13S Computer Systems and C Programming'},
  {  name : 'CSE 140', label : 'CSE 140 Artificial Intelligence'},
  {  name : 'CSE 142', label : 'CSE 142 Machine Learning'},
  {  name : 'CSE 143', label : 'CSE 143 Introduction to Natural Language Processing'},
  {  name : 'CSE 144', label : 'CSE 144 Applied Machine Learning'},
  {  name : 'CSE 145', label : 'CSE 145 Introduction to Data Mining'},
  {  name : 'CSE 146', label : 'CSE 146 Ethics and Algorithms'},
  {  name : 'CSE 150', label : 'CSE 150 Introduction to Computer Networks'},
  {  name : 'CSE 151', label : 'CSE 151 Advanced Computer Networks'},
  {  name : 'CSE 152', label : 'CSE 152 Principles of Computer Communication'},
  {  name : 'CSE 156', label : 'CSE 156 Network Programming'},
  {  name : 'CSE 157', label : 'CSE 157 Internet of Things'},
  {  name : 'CSE 16', label : 'CSE 16 Applied Discrete Mathematics'},
  {  name : 'CSE 160', label : 'CSE 160 Introduction to Computer Graphics'},
  {  name : 'CSE 161', label : 'CSE 161 Introduction to Data Visualization'},
  {  name : 'CSE 162', label : 'CSE 162 Advanced Computer Graphics and Animation'},
  {  name : 'CSE 163', label : 'CSE 163 Data Programming for Visualization'},
  {  name : 'CSE 165', label : 'CSE 165 Human-Computer Interaction'},
  {  name : 'CSE 167', label : 'CSE 167 Mobile Sensing and Interaction'},
  {  name : 'CSE 168', label : 'CSE 168 Introduction to Augmented Reality and Virtual Reality'},
  {  name : 'CSE 180', label : 'CSE 180 Database Systems I'},
  {  name : 'CSE 181', label : 'CSE 181 Database Systems II'},
  {  name : 'CSE 182', label : 'CSE 182 Introduction to Database Management Systems'},
  {  name : 'CSE 183', label : 'CSE 183 Web Applications'},
  {  name : 'CSE 184', label : 'CSE 184 Data Wrangling and Web Scraping'},
  {  name : 'CSE 185E', label : 'CSE 185E Technical Writing for Computer Science and Engineering'},
  {  name : 'CSE 191', label : 'CSE 191 Computer Science and Technology Seminar'},
  {  name : 'CSE 192', label : 'CSE 192 Supervised Student Teaching/Tutoring'},
  {  name : 'CSE 193', label : 'CSE 193 Field Study'},
  {  name : 'CSE 194', label : 'CSE 194 Group Tutorial'},
  {  name : 'CSE 195', label : 'CSE 195 Senior Thesis Research'},
  {  name : 'CSE 198', label : 'CSE 198 Individual Study or Research'},
  {  name : 'CSE 199', label : 'CSE 199 Tutorial'},
  {  name : 'CSE 20', label : 'CSE 20 Beginning Programming in Python'},
  {  name : 'CSE 200', label : 'CSE 200 Research and Teaching in Computer Science and Engineering'},
  {  name : 'CSE 201', label : 'CSE 201 Analysis of Algorithms'},
  {  name : 'CSE 202', label : 'CSE 202 Combinatorial Algorithms'},
  {  name : 'CSE 204', label : 'CSE 204 Computational Models and Complexity'},
  {  name : 'CSE 205', label : 'CSE 205 Logic in Computer Science'},
  {  name : 'CSE 207', label : 'CSE 207 Graph Algorithms'},
  {  name : 'CSE 210A', label : 'CSE 210A Programming Languages'},
  {  name : 'CSE 210B', label : 'CSE 210B Advanced Programming Languages'},
  {  name : 'CSE 211', label : 'CSE 211 Compiler Design'},
  {  name : 'CSE 212A', label : 'CSE 212A Software Engineering'},
  {  name : 'CSE 212B', label : 'CSE 212B Software Reuse and Component-Based Software Engineering'},
  {  name : 'CSE 214', label : 'CSE 214 Principles of Database Systems'},
  {  name : 'CSE 215', label : 'CSE 215 Design and Implementation of Database Systems'},
  {  name : 'CSE 216', label : 'CSE 216 Formal Methods'},
  {  name : 'CSE 220', label : 'CSE 220 Computer Architecture'},
  {  name : 'CSE 221', label : 'CSE 221 Advanced Microprocessor Design'},
  {  name : 'CSE 222A', label : 'CSE 222A VLSI Digital System Design'},
  {  name : 'CSE 222B', label : 'CSE 222B VLSI System-on-a-Chip Design'},
  {  name : 'CSE 225', label : 'CSE 225 Introduction to ASIC Systems Design'},
  {  name : 'CSE 226', label : 'CSE 226 Advanced Parallel Processing'},
  {  name : 'CSE 229', label : 'CSE 229 Field-Programmable Gate Arrays Computer-Assisted Design'},
  {  name : 'CSE 231', label : 'CSE 231 Advanced Operating Systems'},
  {  name : 'CSE 232', label : 'CSE 232 Distributed Systems'},
  {  name : 'CSE 233', label : 'CSE 233 Advanced Computer Security'},
  {  name : 'CSE 234', label : 'CSE 234 Understanding Cryptography'},
  {  name : 'CSE 235', label : 'CSE 235 Cyber-Physical Systems Security'},
  {  name : 'CSE 237', label : 'CSE 237 Storage Systems'},
  {  name : 'CSE 240', label : 'CSE 240 Artificial Intelligence'},
  {  name : 'CSE 241', label : 'CSE 241 Knowledge Engineering'},
  {  name : 'CSE 242', label : 'CSE 242 Machine Learning'},
  {  name : 'CSE 243', label : 'CSE 243 Data Mining'},
  {  name : 'CSE 244A', label : 'CSE 244A Foundations of Deep Learning'},
  {  name : 'CSE 244B', label : 'CSE 244B Machine Learning for Natural Language Processing'},
  {  name : 'CSE 245', label : 'CSE 245 Computational Models of Discourse and Dialogue'},
  {  name : 'CSE 246', label : 'CSE 246 Responsible Data Science'},
  {  name : 'CSE 247', label : 'CSE 247 Projects in Artificial Intelligence'},
  {  name : 'CSE 248', label : 'CSE 248 Foundations of Data Science'},
  {  name : 'CSE 249', label : 'CSE 249 Large-Scale Web Analytics and Machine Learning'},
  {  name : 'CSE 250A', label : 'CSE 250A Computer Networks'},
  {  name : 'CSE 250B', label : 'CSE 250B Principles of Computer Communication'},
  {  name : 'CSE 250C', label : 'CSE 250C High Speed Computer Networks'},
  {  name : 'CSE 253', label : 'CSE 253 Network Security'},
  {  name : 'CSE 257', label : 'CSE 257 Wireless and Mobile Networks'},
  {  name : 'CSE 259', label : 'CSE 259 Sensor Networks'},
  {  name : 'CSE 260', label : 'CSE 260 Computer Graphics'},
  {  name : 'CSE 261', label : 'CSE 261 Advanced Visualization'},
  {  name : 'CSE 262', label : 'CSE 262 Computer Animation'},
  {  name : 'CSE 263', label : 'CSE 263 Data Driven Discovery and Visualization'},
  {  name : 'CSE 264', label : 'CSE 264 Computer Vision'},
  {  name : 'CSE 265', label : 'CSE 265 Human-Computer Interaction'},
  {  name : 'CSE 272', label : 'CSE 272 Information Retrieval'},
  {  name : 'CSE 276', label : 'CSE 276 Optimization Theory and Applications'},
  {  name : 'CSE 277', label : 'CSE 277 Random Process Models in Engineering'},
  {  name : 'CSE 279', label : 'CSE 279 Data Mining and Business Analytics in Knowledge Services'},
  {  name : 'CSE 280A', label : 'CSE 280A Seminar in Computer Science and Engineering'},
  {  name : 'CSE 280D', label : 'CSE 280D Seminar in Database Systems'},
  {  name : 'CSE 280F', label : 'CSE 280F Seminar on Software Engineering'},
  {  name : 'CSE 280G', label : 'CSE 280G VLSI/CAD Seminar'},
  {  name : 'CSE 280H', label : 'CSE 280H Seminar in Human Computation Systems'},
  {  name : 'CSE 280I', label : 'CSE 280I Seminar on Information Retrieval and Knowledge Management'},
  {  name : 'CSE 280J', label : 'CSE 280J Seminar on Computer Graphics'},
  {  name : 'CSE 280K', label : 'CSE 280K Sales and Marketing for Technologists and Engineers'},
  {  name : 'CSE 280L', label : 'CSE 280L Seminar on Logic in Computer Science'},
  {  name : 'CSE 280M', label : 'CSE 280M Seminar on Machine Learning'},
  {  name : 'CSE 280N', label : 'CSE 280N Seminar on Networks'},
  {  name : 'CSE 280O', label : 'CSE 280O Seminar in Applied Programming Languages'},
  {  name : 'CSE 280P', label : 'CSE 280P Seminar on Parallel Processing'},
  {  name : 'CSE 280S', label : 'CSE 280S Seminar on Computer Systems'},
  {  name : 'CSE 280T', label : 'CSE 280T Seminar on New Technologies'},
  {  name : 'CSE 280V', label : 'CSE 280V Seminar on Computer Vision'},
  {  name : 'CSE 280X', label : 'CSE 280X Seminar in Distributed Systems'},
  {  name : 'CSE 280Z', label : 'CSE 280Z Seminar in Natural Language Processing and Dialogue'},
  {  name : 'CSE 285', label : 'CSE 285 Technical Writing for Engineering Graduates'},
  {  name : 'CSE 290A', label : 'CSE 290A Topics in Algorithms and Complexity Theory: Probabilistic Algorithms and Average Case Analysis'},
  {  name : 'CSE 290C', label : 'CSE 290C Advanced Topics in Machine Learning'},
  {  name : 'CSE 290D', label : 'CSE 290D Neural Computation'},
  {  name : 'CSE 290E', label : 'CSE 290E Object-Oriented Programming Methodology'},
  {  name : 'CSE 290F', label : 'CSE 290F Applications of Combinatorics'},
  {  name : 'CSE 290G', label : 'CSE 290G Topics in Software Engineering'},
  {  name : 'CSE 290H', label : 'CSE 290H Topics in Database Systems'},
  {  name : 'CSE 290J', label : 'CSE 290J Advanced Topics in Computer Graphics and Visual Computing'},
  {  name : 'CSE 290K', label : 'CSE 290K Advanced Topics in Natural Language Processing'},
  {  name : 'CSE 290L', label : 'CSE 290L Topics in Crowdsourcing and Collaboration'},
  {  name : 'CSE 290M', label : 'CSE 290M Topics in Parallel Computation'},
  {  name : 'CSE 290N', label : 'CSE 290N Topics in Computer Performance'},
  {  name : 'CSE 290O', label : 'CSE 290O Algorithmic Foundations of Convex Optimization'},
  {  name : 'CSE 290P', label : 'CSE 290P Data Privacy Via Machine Learning, and Back'},
  {  name : 'CSE 290Q', label : 'CSE 290Q Topics in Programming Languages'},
  {  name : 'CSE 290S', label : 'CSE 290S Advanced Topics in Computer Systems'},
  {  name : 'CSE 290T', label : 'CSE 290T Topics in Computing for Society'},
  {  name : 'CSE 290X', label : 'CSE 290X Cryptography and Computer Security'},
  {  name : 'CSE 293', label : 'CSE 293 Advanced Topics in Computer Science &amp; Engineering'},
  {  name : 'CSE 296', label : 'CSE 296 Masters Project'},
  {  name : 'CSE 297A', label : 'CSE 297A Individual Study or Research'},
  {  name : 'CSE 297B', label : 'CSE 297B Individual Study or Research'},
  {  name : 'CSE 297C', label : 'CSE 297C Individual Study or Research'},
  {  name : 'CSE 297F', label : 'CSE 297F Independent Study or Research'},
  {  name : 'CSE 299A', label : 'CSE 299A Thesis Research'},
  {  name : 'CSE 299B', label : 'CSE 299B Thesis Research'},
  {  name : 'CSE 299C', label : 'CSE 299C Thesis Research'},
  {  name : 'CSE 299F', label : 'CSE 299F Thesis Research'},
  {  name : 'CSE 3', label : 'CSE 3 Personal Computer Concepts: Software and Hardware'},
  {  name : 'CSE 30', label: 'CSE 30 Programming Abstractions: Python'},
  {  name : 'CSE 40', label : 'CSE 40 Machine Learning Basics: Data Analysis and Empirical Methods'},
  {  name : 'CSE 5J', label : 'CSE 5J Introduction to Programming in Java'},
  {  name : 'CSE 80A', label : 'CSE 80A Universal Access: Disability, Technology, and Society'},
  {  name : 'CSE 80L', label : 'CSE 80L Social Data Analytics and Visualization'},
  {  name : 'CSE 80N', label : 'CSE 80N Introduction to Networking and the Internet'},
  {  name : 'CSE 80S', label : 'CSE 80S Social Networks'},
  {  name : 'CSE 94', label : 'CSE 94 Group Tutorial'},
  {  name : 'CSE 94F', label : 'CSE 94F Group Tutorial'},
  {  name : 'CSE 99', label : 'CSE 99 Tutorial'},
  {  name : 'CSE 99F', label : 'CSE 99F Tutorial'},
  {  name : 'ECE 253', label : 'ECE 253 Introduction to Information Theory'},
  {  name : 'ECON 166A', label : 'ECON 166A Game Theory and Applications I'},
  {  name : 'ECON 166B', label : 'ECON 166B Game Theory and Applications II'},
  {  name : 'ECON 272', label : 'ECON 272 Evolutionary Game Theory'},
  {  name : 'MATH 110', label : 'MATH 110 Introduction to Number Theory'},
  {  name : 'MATH 115', label : 'MATH 115 Graph Theory'},
  {  name : 'MATH 116', label : 'MATH 116 Combinatorics'},
  {  name : 'MATH 117', label : 'MATH 117 Advanced Linear Algebra'},
  {  name : 'MATH 118', label : 'MATH 118 Advanced Number Theory'},
  {  name : 'MATH 134', label : 'MATH 134 Cryptography'},
  {  name : 'MATH 145', label : 'MATH 145 Introductory Chaos Theory'},
  {  name : 'MATH 148', label : 'MATH 148 Numerical Analysis'},
  {  name : 'MATH 160', label : 'MATH 160 Mathematical Logic I'},
  {  name : 'MATH 161', label : 'MATH 161 Mathematical Logic II'},
  {  name : 'STAT 132', label : 'STAT 132 Classical and Bayesian Inference'},
  {  name : 'STAT 266A', label : 'STAT 266A Data Visualization and Statistical Programming in R'},
  {  name : 'STAT 266B', label : 'STAT 266B Advanced Statistical Programming in R'},
  {  name : 'STAT 266C', label : 'STAT 266C Introduction to Data Wrangling'},
];

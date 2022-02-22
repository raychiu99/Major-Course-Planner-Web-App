import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link,useHistory} from 'react-router-dom';
import { useCourse } from '../contexts/CourseContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { DialogContent } from '@mui/material';
const theme = createTheme();


export default function SelectRequirements() {
    const drawerWidth = 240;
    const {insertAllCourses} = useCourse();
    const history = useHistory();
    const [open, setOpen] = useState(true);
    const csReqs = [
        "MATH 19A", "MATH 20A", "MATH 19B", "MATH 20B", "AM 10", "MATH 21",
        "AM 30", "MATH 23A", "CSE 16", "CSE 20", "CSE 12(L)", "CSE 13S",
        "CSE 13E", "CSE 30", "CSE 101", "CSE 120"
    ];
    const reqObj = [{0:"MATH 19A",1 : {
        "Class Description" : "The limit of a function, calculating limits, continuity, tangents, velocities, and other instantaneous rates of change. Derivatives, the chain rule, implicit differentiation, higher derivatives. Exponential functions, inverse functions, and their derivatives. The mean value theorem, monotonic functions, concavity, and points of inflection. Applied maximum and minimum problems. Students cannot receive credit for both this course and MATH 11A, or AM 11A, or AM 15A, or ECON 11A.",
        "Class Name" : "MATH 19A Calculus for Science, Engineering, and Mathematics",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): MATH 3; or mathematics placement (MP) score of 400 or higher; or AP Calculus AB exam score of 3 or higher."
      }},
      {0:"MATH 19B", 1 : {
        "Class Description" : "The definite integral and the fundamental theorem of calculus. Areas, volumes. Integration by parts, trigonometric substitution, and partial fractions methods. Improper integrals. Sequences, series, absolute convergence and convergence tests. Power series, Taylor and Maclaurin series. Students cannot receive credit for both this course and MATH 11B, or AM 11B, or AM 15B, or ECON 11B.",
        "Class Name" : "MATH 19B Calculus for Science, Engineering, and Mathematics",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): MATH 19A or MATH 20A or AP Calculus AB exam score of 4 or 5, or BC exam score of 3 or higher, or IB Mathematics Higher Level exam score of 5 of higher."
      }},
      {0:"MATH 20A",1 : {
        "Class Description" : "Methods of proof, number systems, binomial and geometric sums. Sequences, limits, continuity, and the definite integral. The derivatives of the elementary functions, the fundamental theorem of calculus, and the main theorems of differential calculus.",
        "Class Name" : "MATH 20A Honors Calculus",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "No information",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): mathematics placement (MP) score of 500 higher; or AP Calculus AB examination score of 4 or 5; or BC examination of 3 or higher; or IB Mathematics Higher Level examination score of 5 or higher."
      }},
      {0:"MATH 20B",1 : {
        "Class Description" : "Orbital mechanics, techniques of integration, and separable differential equations. Taylor expansions and error estimates, the Gaussian integral, Gamma function and Stirling's formula. Series and power series, numerous applications to physics.",
        "Class Name" : "MATH 20B Honors Calculus",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "No information",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): MATH 20A."
      }},
      {0:"CSE 16",1 : {
        "Class Description" : "Introduction to applications of discrete mathematical systems. Topics include sets, functions, relations, graphs, predicate calculus, mathematical proof methods (induction, contraposition, contradiction), counting methods (permutations, combinations), and recurrences. Examples are drawn from computer science and computer engineering. Knowledge of computer programming is useful before taking this course. Students who do not have prior programing experience are strongly recommended to take Computer Science 5C, 5J, or 5P before taking this course.",
        "Class Name" : "CSE 16 Applied Discrete Mathematics",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "Tracy Larrabee, Martine Schlag, Owen Arden, Chen Qian, Alvaro Cardenas",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Requirements" : "Prerequisite(s): MATH 19A or MATH 19B or MATH 11B or AM 11B or AM 15B or ECON 11B."
      }},
      {0:"AM 30", 1 : {
        "Class Description" : "Advanced multivariate calculus for engineering majors. Coordinate systems, parametric curves, and surfaces; partial derivatives, gradient, Taylor expansion, stationary points, constrained optimization; integrals in multiple dimensions; integrals over curves and surfaces. Applications to engineering form an integral part of the course.",
        "Class Name" : "AM 30 Multivariate Calculus for Engineers",
        "Credits" : "5",
        "General Education Code" : "None",
        "Professor(s)" : "Qi Gong, Yonathan Katznelson, Pascale Garaud, Nicholas Brummell",
        "Quarter Offered" : "Fall, Spring",
        "Requirements" : "Prerequisite(s): AM 10; MATH 19B or MATH 20B."
      }},
      {0:"MATH 23A", 1 : {
        "Class Description" : "Vectors in n-dimensional Euclidean space. The inner and cross products. The derivative of functions from n-dimensional to m-dimensional Euclidean space is studied as a linear transformation having matrix representation. Paths in 3-dimensions, arc length, vector differential calculus, Taylor's theorem in several variables, extrema of real-valued functions, constrained extrema and Lagrange multipliers, the implicit function theorem, some applications. Students cannot receive credit for this course and MATH 22 or AM 30. ",
        "Class Name" : "MATH 23A Vector Calculus",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): MATH 19B or MATH 20B or AP calculus BC exam score of 4 or 5."
      }},
      {0:"AM 10", 1 : {
        "Class Description" : "Applications-oriented course on complex numbers and linear algebra integrating Matlab as a computational support tool. Introduction to complex algebra. Vectors, bases and transformations, matrix algebra, solutions of linear systems, inverses and determinants, eigenvalues and eigenvectors, and geometric transformations. Students cannot receive credit for this course and for AM 10A or MATH 21. (Formerly AMS 10.)",
        "Class Name" : "AM 10 Mathematical Methods for Engineers I",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "Vanessa Jonsson, Hongyun Wang, Bruno Mendes, Yonathan Katznelson, Nicholas Brummell, Qi Gong, Daniele Venturi, Marcella Gomez",
        "Quarter Offered" : "Fall, Winter, Spring",
        "Requirements" : "Prerequisite(s): score of 400 or higher on the  mathematics placement examination (MPE)  or MATH 3."
      }},
      {0:"MATH 21", 1 : {
        "Class Description" : "Systems of linear equations matrices, determinants. Introduces abstract vector spaces, linear transformation, inner products, the geometry of Euclidean space, and eigenvalues. Students cannot receive credit for this course and AM 10.",
        "Class Name" : "MATH 21 Linear Algebra",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "No information",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): MATH 11A or MATH 19A or MATH 20A  or AM 11A or AM 15A."
      }},
      {0:"CSE 20", 1 : {
        "Class Description" : "Provides students with Python programming skills and the ability to design programs and read Python code. Topics include data types, control flow, methods and advanced functions, built-in data structures, and introduction to OOP. No prior programming experience is required. Students may not receive credit for CSE 20 after receiving credit for CSE 30. Students with prior programming experience (especially in Python) are encouraged to take CSE Testout Exam to be evaluated for their readiness to take CSE 30 directly: https://undergrad.soe.ucsc.edu/cse-20-testout-exam.",
        "Class Name" : "CSE 20 Beginning Programming in Python",
        "Credits" : "5",
        "General Education Code" : "MF",
        "Professor(s)" : "Narges Alvaro, Narges Norouzi, Tracy Larrabee, Faisal Nawab, Patrick Tantalo, Benedict Paten, Marilyn Walker",
        "Quarter Offered" : "Fall, Winter, Spring",
        "Requirements" : "Prerequisite(s): MATH 19A or MATH 19B or MATH 11B or AM 11B or AM 15B or ECON 11B."
      }},
      {0:"CSE 12", 1 : {
        "Class Description" : "Introduction to computer systems and assembly language and how computers compute in hardware and software. Topics include digital logic, number systems, data structures, compiling/assembly process, basics of the system software, and computer architecture. Course is 7 credits with integrated laboratories illustrating concepts covered in lecture. Note that CSE 12 assumes some programming experience. Students can show programming experience by taking one of the courses listed in the prerequisite list below or by taking the CSE python Test-out Exam: https://undergrad.soe.ucsc.edu/cse-20-testout-exam (Formerly CSE 12 and CSE 12L)",
        "Class Name" : "CSE 12 Computer Systems and Assembly Language and Lab",
        "Credits" : "7",
        "General Education Code" : "None",
        "Professor(s)" : " The Staff, Tracy Larrabee, Darrell Long, Jose Renau Ardevol, Matthew Guthaus, Max Dunne, Sagnik Nath",
        "Quarter Offered" : "Fall, Winter, Spring, Summer",
        "Requirements" : "Prerequisite(s): CSE 5J, or CSE 20, or CSE 30, or BME 160, or equivalent."
      }},
      {0:"CSE 13S", 1 : {
        "Class Description" : "Focuses on C programming, command line, shell programming, editors, debuggers, source code control, and other tools. Examines basic computer systems, algorithm design, and development, data types, and program structures. Develops understanding of process model, compile-link-execute build cycle, language-machine interface, memory, and data representation. Students cannot receive credit for both CSE 13S and CSE 13E. Course is 7 credits with integrated laboratory.",
        "Class Name" : "CSE 13S Computer Systems and C Programming",
        "Credits" : "7",
        "General Education Code" : "None",
        "Professor(s)" : "Darrell Long, Peter Alvaro, Faisal Nawab, Davis Harrison",
        "Quarter Offered" : "Fall, Winter, Spring",
        "Requirements" : "Prerequisite(s): CSE 12 or BME 160."
      }},
      {0:"CSE 30", 1 : {
        "Class Description" : "Introduction to software development in Python focusing on structuring software in terms of objects endowed with primitive operations. Introduces concepts and techniques via a sequence of concrete case studies. Coursework consists of programming assignments and a final examination. Note that CSE 30 assumes some Python experience, students trained in a different language should self-study Python to prepare for CSE 30. See <a href=\"https://undergrad.soe.ucsc.edu/cse-20-testout-exam\" rel=\"noopener noreferrer\" target=\"_blank\">CSE Testout Exam</a> for resources and further information.",
        "Class Name" : "CSE 30 Programming Abstractions: Python",
        "Credits" : "7",
        "General Education Code" : "None",
        "Professor(s)" : "L. De Alfaro, P. Alvaro, D. Bailey, L. Kuper, A. Pang",
        "Quarter Offered" : "Fall, Winter, Spring",
        "Requirements" : "Prerequisite(s): CSE 20 or BME 160; and MATH 3 or MATH 11A or MATH 19A or AM 3 or AM 11A or ECON 11A, or a score of 400 or higher on the mathematics placement examination (MPE)."
      }},
      {0:"CSE 101", 1 : {
        "Class Description" : "Introduction to abstract data types and basics of algorithms. Linked lists, stacks, queues, hash tables, trees, heaps, and graphs will be covered. Students will also be taught how to derive big-Oh analysis of simple algorithms. All assignments will be in C/C++. (Formerly Computer Science 101 Algorithms and Abstract Data Types.)",
        "Class Name" : "CSE 101 Introduction to Data Structures and Algorithms",
        "Credits" : "5",
        "General Education Code" : "None",
        "Professor(s)" : " The Staff, Patrick Tantalo, Manfred Warmuth, Allen Van Gelder, David Helmbold, Seshadhri Comandur, James Davis, Alex Pang",
        "Quarter Offered" : "Fall, Winter, Spring",
        "Repeatable for credit" : "Yes",
        "Requirements" : "Prerequisite(s): CSE 12 or BME 160; CSE 13E or ECE 13 or CSE 13S; and CSE 16; and CSE 30; and MATH 11B or MATH 19B or MATH 20B or AM 11B."
      }}
    ]
    const tookAllReqsObj = [{0:"MATH 19A",1 : {
      "Class Description" : "The limit of a function, calculating limits, continuity, tangents, velocities, and other instantaneous rates of change. Derivatives, the chain rule, implicit differentiation, higher derivatives. Exponential functions, inverse functions, and their derivatives. The mean value theorem, monotonic functions, concavity, and points of inflection. Applied maximum and minimum problems. Students cannot receive credit for both this course and MATH 11A, or AM 11A, or AM 15A, or ECON 11A.",
      "Class Name" : "MATH 19A Calculus for Science, Engineering, and Mathematics",
      "Credits" : "5",
      "General Education Code" : "MF",
      "Professor(s)" : "No information",
      "Quarter Offered" : "Fall, Winter, Spring, Summer",
      "Repeatable for credit" : "Yes",
      "Requirements" : "Prerequisite(s): MATH 3; or mathematics placement (MP) score of 400 or higher; or AP Calculus AB exam score of 3 or higher."
    }},
    {0:"MATH 19B", 1 : {
      "Class Description" : "The definite integral and the fundamental theorem of calculus. Areas, volumes. Integration by parts, trigonometric substitution, and partial fractions methods. Improper integrals. Sequences, series, absolute convergence and convergence tests. Power series, Taylor and Maclaurin series. Students cannot receive credit for both this course and MATH 11B, or AM 11B, or AM 15B, or ECON 11B.",
      "Class Name" : "MATH 19B Calculus for Science, Engineering, and Mathematics",
      "Credits" : "5",
      "General Education Code" : "MF",
      "Professor(s)" : "No information",
      "Quarter Offered" : "Fall, Winter, Spring, Summer",
      "Repeatable for credit" : "Yes",
      "Requirements" : "Prerequisite(s): MATH 19A or MATH 20A or AP Calculus AB exam score of 4 or 5, or BC exam score of 3 or higher, or IB Mathematics Higher Level exam score of 5 of higher."
    }},
    {0:"CSE 16",1 : {
      "Class Description" : "Introduction to applications of discrete mathematical systems. Topics include sets, functions, relations, graphs, predicate calculus, mathematical proof methods (induction, contraposition, contradiction), counting methods (permutations, combinations), and recurrences. Examples are drawn from computer science and computer engineering. Knowledge of computer programming is useful before taking this course. Students who do not have prior programing experience are strongly recommended to take Computer Science 5C, 5J, or 5P before taking this course.",
      "Class Name" : "CSE 16 Applied Discrete Mathematics",
      "Credits" : "5",
      "General Education Code" : "MF",
      "Professor(s)" : "Tracy Larrabee, Martine Schlag, Owen Arden, Chen Qian, Alvaro Cardenas",
      "Quarter Offered" : "Fall, Winter, Spring, Summer",
      "Requirements" : "Prerequisite(s): MATH 19A or MATH 19B or MATH 11B or AM 11B or AM 15B or ECON 11B."
    }},
    {0:"AM 30", 1 : {
      "Class Description" : "Advanced multivariate calculus for engineering majors. Coordinate systems, parametric curves, and surfaces; partial derivatives, gradient, Taylor expansion, stationary points, constrained optimization; integrals in multiple dimensions; integrals over curves and surfaces. Applications to engineering form an integral part of the course.",
      "Class Name" : "AM 30 Multivariate Calculus for Engineers",
      "Credits" : "5",
      "General Education Code" : "None",
      "Professor(s)" : "Qi Gong, Yonathan Katznelson, Pascale Garaud, Nicholas Brummell",
      "Quarter Offered" : "Fall, Spring",
      "Requirements" : "Prerequisite(s): AM 10; MATH 19B or MATH 20B."
    }},{0:"AM 10", 1 : {
      "Class Description" : "Applications-oriented course on complex numbers and linear algebra integrating Matlab as a computational support tool. Introduction to complex algebra. Vectors, bases and transformations, matrix algebra, solutions of linear systems, inverses and determinants, eigenvalues and eigenvectors, and geometric transformations. Students cannot receive credit for this course and for AM 10A or MATH 21. (Formerly AMS 10.)",
      "Class Name" : "AM 10 Mathematical Methods for Engineers I",
      "Credits" : "5",
      "General Education Code" : "MF",
      "Professor(s)" : "Vanessa Jonsson, Hongyun Wang, Bruno Mendes, Yonathan Katznelson, Nicholas Brummell, Qi Gong, Daniele Venturi, Marcella Gomez",
      "Quarter Offered" : "Fall, Winter, Spring",
      "Requirements" : "Prerequisite(s): score of 400 or higher on the  mathematics placement examination (MPE)  or MATH 3."
    }},
    {0:"CSE 20", 1 : {
      "Class Description" : "Provides students with Python programming skills and the ability to design programs and read Python code. Topics include data types, control flow, methods and advanced functions, built-in data structures, and introduction to OOP. No prior programming experience is required. Students may not receive credit for CSE 20 after receiving credit for CSE 30. Students with prior programming experience (especially in Python) are encouraged to take CSE Testout Exam to be evaluated for their readiness to take CSE 30 directly: https://undergrad.soe.ucsc.edu/cse-20-testout-exam.",
      "Class Name" : "CSE 20 Beginning Programming in Python",
      "Credits" : "5",
      "General Education Code" : "MF",
      "Professor(s)" : "Narges Alvaro, Narges Norouzi, Tracy Larrabee, Faisal Nawab, Patrick Tantalo, Benedict Paten, Marilyn Walker",
      "Quarter Offered" : "Fall, Winter, Spring",
      "Requirements" : "Prerequisite(s): MATH 19A or MATH 19B or MATH 11B or AM 11B or AM 15B or ECON 11B."
    }},
    {0:"CSE 12", 1 : {
      "Class Description" : "Introduction to computer systems and assembly language and how computers compute in hardware and software. Topics include digital logic, number systems, data structures, compiling/assembly process, basics of the system software, and computer architecture. Course is 7 credits with integrated laboratories illustrating concepts covered in lecture. Note that CSE 12 assumes some programming experience. Students can show programming experience by taking one of the courses listed in the prerequisite list below or by taking the CSE python Test-out Exam: https://undergrad.soe.ucsc.edu/cse-20-testout-exam (Formerly CSE 12 and CSE 12L)",
      "Class Name" : "CSE 12 Computer Systems and Assembly Language and Lab",
      "Credits" : "7",
      "General Education Code" : "None",
      "Professor(s)" : " The Staff, Tracy Larrabee, Darrell Long, Jose Renau Ardevol, Matthew Guthaus, Max Dunne, Sagnik Nath",
      "Quarter Offered" : "Fall, Winter, Spring, Summer",
      "Requirements" : "Prerequisite(s): CSE 5J, or CSE 20, or CSE 30, or BME 160, or equivalent."
    }},
    {0:"CSE 13S", 1 : {
      "Class Description" : "Focuses on C programming, command line, shell programming, editors, debuggers, source code control, and other tools. Examines basic computer systems, algorithm design, and development, data types, and program structures. Develops understanding of process model, compile-link-execute build cycle, language-machine interface, memory, and data representation. Students cannot receive credit for both CSE 13S and CSE 13E. Course is 7 credits with integrated laboratory.",
      "Class Name" : "CSE 13S Computer Systems and C Programming",
      "Credits" : "7",
      "General Education Code" : "None",
      "Professor(s)" : "Darrell Long, Peter Alvaro, Faisal Nawab, Davis Harrison",
      "Quarter Offered" : "Fall, Winter, Spring",
      "Requirements" : "Prerequisite(s): CSE 12 or BME 160."
    }},
    {0:"CSE 30", 1 : {
      "Class Description" : "Introduction to software development in Python focusing on structuring software in terms of objects endowed with primitive operations. Introduces concepts and techniques via a sequence of concrete case studies. Coursework consists of programming assignments and a final examination. Note that CSE 30 assumes some Python experience, students trained in a different language should self-study Python to prepare for CSE 30. See <a href=\"https://undergrad.soe.ucsc.edu/cse-20-testout-exam\" rel=\"noopener noreferrer\" target=\"_blank\">CSE Testout Exam</a> for resources and further information.",
      "Class Name" : "CSE 30 Programming Abstractions: Python",
      "Credits" : "7",
      "General Education Code" : "None",
      "Professor(s)" : "L. De Alfaro, P. Alvaro, D. Bailey, L. Kuper, A. Pang",
      "Quarter Offered" : "Fall, Winter, Spring",
      "Requirements" : "Prerequisite(s): CSE 20 or BME 160; and MATH 3 or MATH 11A or MATH 19A or AM 3 or AM 11A or ECON 11A, or a score of 400 or higher on the mathematics placement examination (MPE)."
    }}];
    const [takenClassArr, setTakenClassArr] = useState([]);

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

  const handleRemove = (classObj) => {
      setTakenClassArr(takenClassArr.filter(item => item[0] !== classObj))
  }
  return (
    
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Dialog
        open={open}
        onClose = {() => setOpen(!open)}
        
      > 
        <DialogTitle>
          <Typography variant = 'h4' align = 'center'>Choose An option</Typography>
        </DialogTitle>
          <DialogContent style = {{height:'300px', width: '600px', textAlign:'center',
            marginTop:'120px'}}>
            <Stack direction="row" spacing={4}>
              <Button color = 'primary' variant='contained' onClick = {()=> (insertAllCourses(tookAllReqsObj),
            history.push("/Courseselction"))}>I HAVE TAKEN ALL LOWER REQUIREMENTS</Button>
              <Button color = 'success' variant='contained' onClick = {()=> (history.push("/Courseselction"))}>
                I HAVE TAKEN NO LOWER REQUIREMENTS</Button>
              <Button color = 'primary' variant='contained' onClick={()=>setOpen(!open)}>I HAVE TAKEN SOME LOWER REQUIREMENTS</Button>
            </Stack>
          </DialogContent>
      </Dialog>
    <div style={{ display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '1.5vh', fontSize: '24px'}}>
      <h1> Select the Lower Division Requirements you have taken</h1>
    </div>
    
      
    <main>
    <Container sx={{ py: 4 }}>
        <Grid container spacing={2}>
          {reqObj.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'left', height: '30px' }}>
                    <h4> {card[1]["Class Name"]} </h4>
                  </div>

                </CardContent>
                <CardActions>
                  <Button size="small" 
                    onClick = {() => {handleClick(card)}}
                  >Add Class</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Typography variant='h4'>{'Classes Selected'}</Typography>
        {(takenClassArr !== undefined) ? 
        <List>
          {takenClassArr.map((classObj) => (
              <ListItem>
                  <ListItemText primary = {classObj[0]}/>
                   <IconButton aria-label="delete" size="large"
                        onClick = {() => {handleRemove(classObj[0])}}
                      >
                        <DeleteIcon />
                      </IconButton>                
              </ListItem>
          ))}
          
        </List>
        : <></>}
        <Button variant = 'contained' onClick = {()=> (insertAllCourses(takenClassArr),
          history.push("/Courseselction"))}
        >{'SUBMIT'}</Button>
        
      </Drawer>
    </Container>
    </main>
      
      </ThemeProvider>
);
}

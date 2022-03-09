import * as React from 'react';
import { useUser } from '../contexts/UserContext';
import Chip from '@mui/material/Chip';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';

export default function Grad() {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const {classesTaken,capstoneTaken,dcTaken,electivesTaken,major, seniority} = useUser();
  //check if basic requirements are satisfied
  const sa1 = () => {
    if (classesTaken.length <= 0 || classesTaken.length === undefined) {
      return false;
    }
    for(let index in csReqs){
      if(classesTaken.indexOf(csReqs[index])< 0 || csReqs[index].includes(classesTaken) === false){
        return false;
      }
    }
    return true;
  }; 
  //check if this class is taken
  const taken1 = (key) => {
    if (classesTaken.length <= 0 || classesTaken.length === undefined) {
      return false;
    }
    for(let index in classesTaken){
      if (classesTaken[index] === key || key.includes(classesTaken[index]) === true){     
        return true;
      }
    }
    
  }; 
  //check if capstone is datisfied
  const sa2 = () => {
    if (capstoneTaken.length <= 0 || capstoneTaken.length === undefined) {
      return false;
    }
    if(capstoneTaken.length >= 1){
      return true;
    }
    return false;
  }; 
   //check if this class is taken
  const taken2 = (key) => {
    if (capstoneTaken.length <= 0 || capstoneTaken.length === undefined) {
      return false;
    }
    if (capstoneTaken.indexOf(key)>= 0){     
      return true;
    }
  }; 
  const sa3 = () => {
    if (dcTaken.length <= 0 || dcTaken.length === undefined) {
      return false;
    }
    if(dcTaken.length >= 1){
      return true;
    }
    return false;
  }; 
   //check if this class is taken
  const taken3 = (key) => {
    if (dcTaken.length <= 0 || dcTaken.length === undefined) {
      return false;
    }
    if (dcTaken.indexOf(key)>= 0){     
      return true;
    }
  }; 
  //check if electives are satisfied
  const sa4 = () => {
    if (electivesTaken.length <= 0 || electivesTaken.length === undefined) {
      return false;
    }
    if(electivesTaken.length >= 4){
      return true;
    }
    return false;
  }; 
   //check if this class is taken
  const taken4 = (key) => {
    if (electivesTaken.length <= 0 || electivesTaken.length === undefined) {
      return false;
    }
    if (electivesTaken.indexOf(key)>= 0){     
      return true;
    }
  }; 
 //expend classes
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
  };
  return (
    <div className="Graduation" style={{height:'100%',backgroundColor:'#fefcf0'}}>
    <div style={{display: 'flex', justifyContent: 'center', height: '10vh', paddingTop: '8vh' }}>
    <h1>Graduation status</h1>
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
      <h4>Major</h4>: {major}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
      <h4>Status</h4>: {seniority}
    </div>
    <List
      sx={{mt:'10%',height:'100%', bgcolor: '#fefcf0'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
        <ListIcon/>
        </ListItemIcon>
        <ListItemText primary="Basic requirements" />
        {sa1() ? <Chip label="Satisfied" color="primary" variant="outlined"/>: <Chip label="Not satisfied" color="error" variant="outlined"/>}
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
      {csReqs.map((key) => (
              <ListItem key={key}>
                <ListItemText primary={key} />
                {taken1(key) ? <Chip label="Taken" color="success" variant="outlined"/>: <Chip label="Not taken" color="warning" variant="outlined"/>}
              </ListItem>
            ))}
      </Collapse>
      <ListItemButton onClick={handleClick1}>
        <ListItemIcon>
        <ListIcon/>
        </ListItemIcon>
        <ListItemText primary="Comprehensive Requirement" />
        {sa2() ? <Chip label="Satisfied" color="primary" variant="outlined"/>: <Chip label="Not satisfied" color="error" variant="outlined"/>}
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
      {capstoneReq.map((key) => (
              <ListItem key={key}>
                <ListItemText primary={key}/>
                {taken2(key) ? <Chip label="Taken" color="success" variant="outlined"/>: <Chip label="Not taken" color="warning" variant="outlined"/>}
              </ListItem>
            ))}
      </Collapse>
      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
        <ListIcon/>
        </ListItemIcon>
        <ListItemText primary="Disciplinary Communication Requirement" />
        {sa3() ? <Chip label="Satisfied" color="primary" variant="outlined"/>: <Chip label="Not satisfied" color="error" variant="outlined"/>}
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
      {dcReqs.map((key) => (
              <ListItem key={key}>
                <ListItemText primary={key}/>
                {taken3(key) ? <Chip label="Taken" color="success" variant="outlined"/>: <Chip label="Not taken" color="warning" variant="outlined"/>}
              </ListItem>
            ))}
      </Collapse>
      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
        <ListIcon/>
        </ListItemIcon>
        <ListItemText primary="Upper Division ELECTIVE" />
        {sa4() ? <Chip label="Satisfied" color="primary" variant="outlined"/>: <Chip label="Not satisfied" color="error" variant="outlined"/>}
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
      {Electives.map((key) => (
              <ListItem key={key}>
                <ListItemText primary={key}/>
                {taken4(key) ? <Chip label="Taken" color="success" variant="outlined"/>: <Chip label="Not taken" color="warning" variant="outlined"/>}
              </ListItem>
            ))}
      </Collapse>
    </List>
    </div>
  );
}

const csReqs = [
  "MATH 19A or MATH 20A", "MATH 19B or MATH 20B", "AM 10 or MATH 21",
  "AM 30 or MATH 23A", "CSE 16", "CSE 20", "CSE 12", "CSE 13S", "CSE 30", "CSE 101", "CSE 120", "CSE 112 or CSE 114A or CSE 114B", "CSE 102", "CSE 103", "CSE 130", "CSE 107 or STAT 131"
];

const dcReqs = ['CSE 115A','CSE 185E', 'CSE 185S', 'CSE 195(F)'];

const capstoneReq = ["CSE 110B",
    "CSE 115C", "CSE 115D", "CSE 118", "CSE 121",
    "CSE 138", "CSE 140", "CSE 143", "CSE 144",
    "CSE 156", "CSE 157", "CSE 160", "CSE 161",
    "CSE 162", "CSE 163", "CSE 168", "CSE 181",
    "CSE 183", "CSE 184", "CMPM 172", "ECE 118"
];

const  Electives = [ 'CSE 104', 'CSE 106','CSE 108', 'CSE 110A', 'CSE 110B', 'CSE 111','CSE 113', 'CSE 114A',
    'CSE 115B', 'CSE 115C', 'CSE 115D','CSE 117', 'CSE 118', 'CSE 119', 'CSE 121', 'CSE 122', 'CSE 123A', 'CSE 123B', 'CSE 125',
    'CSE 129A','CSE 129B','CSE 129C','CSE 132','CSE 134','CSE 138','CSE 140', 'CSE 142', "CSE 143", "CSE 144", "CSE 150(L)", "CSE 151(L)",
    "CSE  152","CSE 156(L)", "CSE 157", "CSE 160(L)", "CSE 161(L)","CSE 162(L)", "CSE 163", "CSE 168", "CSE 180" ,"CSE 181", "CSE 182", "CSE 183", "CSE 184",
     'AM 114', 'AM 147', 'MATH 110', 'MATH 115', 'MATH 116',
    'MATH 117', 'MATH 118', 'MATH 134', 'MATH 145(L)', 'MATH 148(L)', 'MATH 160',
    'MATH 161', 'STAT 132','CMPM 120', 'CMPM 131', 'CMPM 146', 'CMPM 163',
    'CMPM 164(L)', 'CMPM 171', 'CMPM 172'
  ];
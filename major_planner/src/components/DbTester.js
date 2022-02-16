// Just testing the database
// Not a file to use in our project
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react';
import BasicList from './CourseList';
export default function RowAndColumnSpacing() {
  /**  When using the get function it gets the faculties plus all the information so it is a very big query to do 
    every time. Instead I used a json folder that I had with the name of the faculties saved so that it is easier to 
    loop through an array to display them.
  */
  const allFaculties =['ACEN-Academic-English', 'AM-Applied-Mathematics', 'ANTH-Anthropology', 'APLX-Applied-Linguistics', 
  'ARBC-Arabic', 'ART-Art', 'ARTG-Art-and-Design-Games-and-Playable-Media', 'ASTR-Astronomy-and-Astrophysics', 
  'BIOC-Biochemistry-and-Molecular-Biology', 'BIOE-Biology-Ecology-and-Evolutionary', 
  'BIOL-Biology-Molecular-Cell-and-Developmental', 'BME-Biomolecular-Engineering', 'CHEM-Chemistry-and-Biochemistry', 
  'CHIN-Chinese', 'CLNI-College-Nine', 'CLST-Classical-Studies', 'CLTE-College-Ten', 'CMMU-Community-Studies', 
  'CMPM-Computational-Media', 'COWL-Cowell-College', 'CRES-Critical-Race-and-Ethnic-Studies', 
  'CRSN-Carson-College', 'CRWN-Crown-College', 'CSE-Computer-Science-and-Engineering', 
  'CSP-Coastal-Science-and-Policy', 'DANM-Digital-Arts-and-New-Media', 'EART-Earth-Sciences', 
  'ECE-Electrical-and-Computer-Engineering', 'ECON-Economics', 'EDUC-Education', 'ENVS-Environmental-Studies', 
  'ESCI-Environmental-Sciences', 'FILM-Film-and-Digital-Media', 'FMST-Feminist-Studies', 'FREN-French', 
  'GAME-Games-and-Playable-Media', 'GERM-German', 'GRAD-Graduate', 'GREE-Greek', 
  'HAVC-History-of-Art-and-Visual-Culture', 'HEBR-Hebrew', 'HISC-History-of-Consciousness', 'HIS-History', 
  'HCI-Human-Computer-Interaction', 'ITAL-Italian', 'JAPN-Japanese', 'JWST-Jewish-Studies', 
  'KRSG-Kresge-College', 'LAAD-Languages', 'LALS-Latin-American-and-Latino-Studies', 'LATN-Latin', 
  'LGST-Legal-Studies', 'LING-Linguistics', 'LIT-Literature', 'MATH-Mathematics', 'MERR-Merrill-College', 
  'METX-Microbiology-and-Environmental-Toxicology', 'MUSC-Music', 'NLP-Natural-Language-Processing', 
  'OAKS-Oakes-College', 'OCEA-Ocean-Sciences', 'PBS-Physical-Biological-Sciences', 'PERS-Persian', 
  'PHIL-Philosophy', 'PHYE-Physical-Education', 'PHYS-Physics', 'POLI-Politics', 'PORT-Portuguese', 
  'PRTR-Porter-College', 'PSYC-Psychology', 'PUNJ-Punjabi', 'RUSS-Russian', 'SCIC-Science-Communication', 
  'SOCD-Social-Documentation', 'SOCY-Sociology', 'SPAN-Spanish', 'SPHS-Spanish-for-Heritage-Speakers', 'STAT-Statistics', 
  'STEV-Stevenson-College', 'THEA-Theater-Arts', 'TIM-Technology-Information-Management', 'UCDC-UCDC', 'WRIT-Writing', 
  'YIDD-Yiddish'];
  const [currentFaculty, setFaculty] = useState('');
  const handleChange = (event) => {
    setFaculty(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Faculty</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentFaculty}
          label="currentFaculty"
          onChange={handleChange}
        > {allFaculties.map((faculty, index)  => (
          <MenuItem value = {faculty} key={faculty}>{faculty}</MenuItem>
        ))}
        </Select>
      </FormControl>
      <>{/*Pass the faculty selected as a prop*/}</>
      <BasicList faculty = {currentFaculty}></BasicList>
    </Box>
  );
}

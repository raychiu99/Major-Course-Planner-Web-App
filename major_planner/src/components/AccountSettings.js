import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Container, List, ListItem, ListItemText } from '@mui/material';
import { getDatabase, get, ref, child } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

const theme = createTheme();

export default function AccountSettings() {
    const majorOpts = ['Undeclared', 'Computer Science (BS)'];
    const seniorityOpts = ['Unspecified', 'Freshman', 'Sophomore', 'Junior', 'Senior'];
    const catalogOpts = ['Unspecified', '2021-2022', '2020-2021', '2018-2019'];
    const deptOpts = ['ACEN-Academic-English', 'AM-Applied-Mathematics', 'ANTH-Anthropology', 'APLX-Applied-Linguistics',
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

    const { updateUser, updateUserPassword, updateAcademicStatus, updateCurrentClasses } = useAuth();
    const { firstName, lastName, email, major, seniority, catalog, currentClasses } = useUser();

    const [newMajor, setNewMajor] = useState(major);
    const [newSeniority, setNewSeniority] = useState(seniority);
    const [newCatalog, setNewCatalog] = useState(catalog);

    const [selectedDept, setSelectedDept] = useState('CSE-Computer-Science-and-Engineering');
    const [classOpts, setClassOpts] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [newCurrentClasses, setNewCurrentClasses] = useState(currentClasses);

    const [userEmail, setUserEmail] = useState(email);
    const [userFirstName, setUserFirstName] = useState(firstName);
    const [userLastName, setUserLastName] = useState(lastName);

    const [userOldPassword, setUserOldPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [userNewPasswordConfirm, setUserNewPasswordConfirm] = useState('');

    const dbRef = ref(getDatabase());

    function fetchClasses() {
        get(child(dbRef, 'Faculties/' + selectedDept)).then((snapshot) => {
            if (snapshot.exists()) {
                setClassOpts(Object.keys(snapshot.val()));
            } else {
                setClassOpts(undefined);
            }
        }).catch((error) => {
            console.log(error);
        });
    };
    React.useEffect(() => {
        fetchClasses();
    }, [selectedDept]);

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        try {
            updateUser(userFirstName, userLastName, userEmail);
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            updateUserPassword(userOldPassword, userNewPassword, userNewPasswordConfirm);
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    const handleUpdateAcademicStatus = async (event) => {
        event.preventDefault();
        try {
            console.log(`${newMajor} ${newSeniority} ${newCatalog}`);
            updateAcademicStatus(newMajor, newSeniority, newCatalog);
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    const handleUpdateCurrentClasses = async (event) => {
        event.preventDefault();
        try {
            handleUpdateCurrentClasses(newCurrentClasses);
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{backgroundColor:'#fefcf0'}}>
            <Container style={{backgroundColor:'#fefcf0'}}>
                <Grid container component="main">
                    <CssBaseline />
                    {/* Academic settings */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Academic Status
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleUpdateAcademicStatus} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete disableClearable autoSelect
                                            value={major}
                                            options={majorOpts}
                                            renderInput={(params) => <TextField {...params} label='Major'></TextField>}
                                            onChange={(ev, val) => { setNewMajor(val); }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete disableClearable autoSelect
                                            value={seniority}
                                            options={seniorityOpts}
                                            renderInput={(params) => <TextField {...params} label='Seniority'></TextField>}
                                            onChange={(ev, val) => { setNewSeniority(val); }} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete disableClearable autoSelect
                                            value={catalog}
                                            options={catalogOpts}
                                            renderInput={(params) => <TextField {...params} label='Catalog'></TextField>}
                                            onChange={(ev, val) => { setNewCatalog(val); }} />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onSubmit={handleUpdateAcademicStatus}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Current Classes
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleUpdateCurrentClasses} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Autocomplete disableClearable autoSelect
                                            options={deptOpts}
                                            value={selectedDept}
                                            renderInput={(params) => <TextField {...params} label='Department'></TextField>}
                                            onChange={(ev, val) => { setSelectedDept(val); setSelectedClass(undefined); }} />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Autocomplete disableClearable autoSelect
                                            onIn
                                            options={classOpts}
                                            value={selectedClass}
                                            renderInput={(params) => <TextField {...params} label='Class'></TextField>}
                                            onChange={(ev, val) => { setSelectedClass(val); }} />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            onSubmit={handleUpdateCurrentClasses}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <List>
                                            {newCurrentClasses.reduce((l, c) => {
                                                l.push((<ListItem><ListItemText primary={c} /></ListItem>));
                                                return l;
                                            }, [])}
                                        </List>
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onSubmit={handleUpdateCurrentClasses}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    {/* Profile and password settings */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Profile
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleUpdateProfile} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={firstName}
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            autoComplete="given-name"
                                            onChange={(event) => setUserFirstName(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={lastName}
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                            onChange={(event) => setUserLastName(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            value={email}
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            onChange={(event) => setUserEmail(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onSubmit={handleUpdateProfile}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                Change Password
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleUpdatePassword} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="oldPassword"
                                            label="Old Password"
                                            type="password"
                                            id="oldPassword"
                                            onChange={(event) => setUserOldPassword(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="newPassword"
                                            label="New Password"
                                            type="password"
                                            id="newPassword"
                                            onChange={(event) => setUserNewPassword(event.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="newPasswordConfirm"
                                            label="Confirm New Password"
                                            type="password"
                                            id="newPasswordConfirm"
                                            onChange={(event) => setUserNewPasswordConfirm(event.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onSubmit={handleUpdatePassword}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            </div>
        </ThemeProvider>
    );
}
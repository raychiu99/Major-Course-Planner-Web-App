import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Container } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';

const theme = createTheme();

export default function AccountSettings() {
    const { updateUser, updateUserPassword, updateAcademicStatus } = useAuth();
    const { firstName, lastName, email, major, seniority, catalog, currentClasses } = useUser();
    const [newMajor, setNewMajor] = useState(major);
    const [newSeniority, setNewSeniority] = useState(seniority);
    const [newCatalog, setNewCatalog] = useState(catalog);
    const [userEmail, setUserEmail] = useState(email);
    const [userFirstName, setUserFirstName] = useState(firstName);
    const [userLastName, setUserLastName] = useState(lastName);
    const [userOldPassword, setUserOldPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const [userNewPasswordConfirm, setUserNewPasswordConfirm] = useState('');

    const majorOpts = ['Undeclared', 'Computer Science (BS)'];
    const seniorityOpts = ['Unspecified', 'Freshman', 'Sophomore', 'Junior', 'Senior'];
    const catalogOpts = ['Unspecified', '2021-2022', '2020-2021', '2018-2019'];

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
            // TODO: implement changing current classes.
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
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
                                        Class Selector Placeholder
                                    </Grid>
                                    <Grid item xs={12}>
                                        Current Class List Placeholder
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
        </ThemeProvider>
    );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { Autocomplete, Container } from '@mui/material';

const theme = createTheme();

export default function AccountSettings() {
    const { signUp } = useAuth();
    const [userEmail, setUserEmail] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userOldPassword, setUserOldPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState('');
    const db = getDatabase();

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        try {
            // TODO: implement changing userEmail, userFirstName, and userLastName.
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        try {
            // TODO: implement changing userPassword.
        } catch (error) {
            console.log('THERES AN ERROR: ', error);
        }
    };

    const handleUpdateAcademicStatus = async (event) => {
        event.preventDefault();
        try {
            // TODO: implement changing current major, seniority (freshman, sophomore, etc),
            // and catalog.
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
                                        <Autocomplete disableClearable
                                            defaultValue='Undeclared'
                                            options={['Undeclared', 'TEST1', 'TEST2']}
                                            renderInput={(params) => <TextField {...params} label='Major'></TextField>} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete
                                            options={['Freshman', 'Sophomore', 'Junior', 'Senior']}
                                            renderInput={(params) => <TextField {...params} label='Seniority'></TextField>} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Autocomplete disableClearable
                                            defaultValue='2021-2022'
                                            options={['2021-2022', '2020-2021', '2018-2019']}
                                            renderInput={(params) => <TextField {...params} label='Catalog'></TextField>} />
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
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            onChange={(event) => setUserFirstName(event.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            onChange={(event) => setUserLastName(event.target.value)}
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
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
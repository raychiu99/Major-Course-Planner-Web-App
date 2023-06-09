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
import { Link, useHistory } from 'react-router-dom';
const theme = createTheme();

export default function SignUp() {
  const { signUp } = useAuth();
  const [userEmail, setUserEmail] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const db = getDatabase();
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await signUp(userEmail, userPassword);
      // console.log('email: ', email, 'password: ', password, 'userId: ', user.user.uid, firstName, lastName, user);
      // console.log('currentUser: ', currentUser);
      set(ref(db, 'Users/' + user.user.uid), {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        major: 'Undeclared',
        seniority: 'Unspecified',
        catalog: 'Unspecified',
        currentClasses: 0,
        classesTaken: 0,
        requirementsTaken: 0,
        electivesTaken: 0,
        dcTaken: 0,
        capstoneTaken: 0,
        creditsTaken: 0
      });
      // Also populate the local storage user upon signing up
      let tempObj = {};
      tempObj.classesTakenArr = 0;
      tempObj.electivesTakenArr = 0;
      tempObj.dcTakenArr = 0;
      tempObj.capstoneTakenArr = 0;
      tempObj.requirementsTakenArr = 0;
      tempObj.currentClassesArr = 0;
      tempObj.creditsTaken = 0;
      tempObj.classesTakenArr = 0;
      window.localStorage.setItem('user-info', JSON.stringify(tempObj));
      history.push("/Courseselection")
    } catch (error) {
      console.log('THERES AN ERROR: ', error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl_wAqPr6COkMcidg-kZ0Od0vXw8BkHVWHuA&usqp=CAU)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(event) => setUserPassword(event.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onSubmit={handleSubmit}

              >
                Sign Up
              </Button>
              <div className="sss">
                Already have an account? <Link to="/">Sign In</Link>
              </div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
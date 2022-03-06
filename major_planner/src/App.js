import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import RowAndColumnSpacing from './components/DbTester';
import HowItWorks from './components/How-it-works';
import Graduation from './components/Graduation';
import AccountSettings from './components/AccountSettings';
import Planner from './components/Next-Quarter-Planner';
import Courseselection from './components/Courseselection';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { CourseProvider } from './contexts/CourseContext';
import { useEffect, useState } from 'react';
function App() {
  const [userCourseObj, setUserCourseObj] = useState( () => {
    const initialState = {classesTakenArr: [],
      dcTakenArr: [],
      capstoneTakenArr:[],
      electivesTakenArr:[]}
    return initialState;
  });

  console.log(userCourseObj)
  return (
    <AuthProvider>
      <UserProvider>
        <CourseProvider>
          <Router>
            <div className="App">
              <Navbar />
              <div className="Content">
                <Switch>
                  <Route exact path="/" component={SignIn} />
                  <Route exact path="/SignUp" component={SignUp} />
                  <Route exact path="/Home" component={Dashboard} />
                  <Route exact path="/How-it-works" component={HowItWorks} />
                  <Route exact path="/DBtester" component={RowAndColumnSpacing} />
                  <Route exact path="/AccountSettings" component={AccountSettings} />
                  <Route exact path="/NextQuarterPlanner">
                    <Planner userCourseObj = {userCourseObj}
                    setUserCourseObj = {setUserCourseObj}/>
                  </Route>
                  <Route exact path="/Courseselection">
                    <Courseselection userCourseObj = {userCourseObj}
                      setUserCourseObj = {setUserCourseObj}
                    />
                  </Route>
                  <Route exact path="/Graduation" component={Graduation} />
                </Switch>
              </div>
            </div>
          </Router>
        </CourseProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;


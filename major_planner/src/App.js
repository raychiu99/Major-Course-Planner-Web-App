import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import RowAndColumnSpacing from './components/DbTester';
import HowItWorks from './components/How-it-works';
import Courseselction from './components/Courseselction';
import AccountSettings from './components/AccountSettings';
import NextQuarterPlanner from './components/Next-Quarter-Planner';

import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { CourseProvider } from './contexts/CourseContext';
function App() {

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
                  <Route exact path="/Courseselction" component={Courseselction} />
                  <Route exact path="/AccountSettings" component={AccountSettings} />
                  <Route exact path="/NextQuarterPlanner" component={NextQuarterPlanner} />
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

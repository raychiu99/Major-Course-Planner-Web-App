import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';
import RowAndColumnSpacing from './components/DbTester';
import HowItWorks from './components/How-it-works';
import Courseselction from './components/Courseselction';
import { UserProvider } from './contexts/UserContext';
function App() {
  
  return (
    <AuthProvider>
      <UserProvider>
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
              </Switch>
            </div>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

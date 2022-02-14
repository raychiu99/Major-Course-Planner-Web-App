import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="Content">
            <Switch>
              <Route exact path="/" component={SignIn} />
              <Route exact path="/SignUp" component={SignUp} />
              <Route exact path="/Home" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

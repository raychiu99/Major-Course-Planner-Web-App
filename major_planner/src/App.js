import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/SignUp" component={SignUp} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignIn from './components/SignIn';
import SignUp from "./components/SignUp";


function App() {
  
  return (
    <Router>
      <div className="App">

        <div className="Content">
          <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>

            <Route exact path="/SignUp">
              <SignUp />
            </Route>
          </Switch>
          
        </div>
      </div>
    </Router>
  );
  
}

export default App;

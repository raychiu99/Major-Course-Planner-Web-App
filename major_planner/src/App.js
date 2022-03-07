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
import { get, getDatabase, ref, child } from "firebase/database";
function App() {
  const dbRef = ref(getDatabase());
  const courses = JSON.parse(localStorage.getItem('courses-info'));
  console.log('courses in app.js: ', courses);
  if (courses === null){
    async function fetchCourses(){
      try {
      const snapshot = await get(child(dbRef, 'Faculties/CSE-Computer-Science-and-Engineering'));
      const value = snapshot.val();
      console.log('value: ', value);
      console.log('storing in local storage', JSON.stringify(value))
      window.localStorage.setItem('courses-info', JSON.stringify(value))
      // setCourses(value);
      // setFetching(true)
      } catch(err){
        console.log('error: ', err);
      }
    }
    fetchCourses();
    
  }
  

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
                  <Route exact path="/NextQuarterPlanner" component={Planner}/>
                  <Route exact path="/Courseselection" component={Courseselection}/>
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


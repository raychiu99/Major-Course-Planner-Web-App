import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { get, getDatabase, ref, child } from "firebase/database";

const UserContext = React.createContext();

// Provides a way to access information about the currently logged in user.
// Use:
// import {useUser} from '../contexts/UserContext';
//
//   // inside the export function of a component
//  export default function Dashboard() {
//    const {firstName} = useUser();
//    const {lastName} = useUser();
//  // Rest of the code
// }
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('Undeclared');
  const [seniority, setSeniority] = useState('Unspecified');
  const [catalog, setCatalog] = useState('Unspecified');
  const [currentClasses, setCurrentClasses] = useState([]);
  const [classesTaken, setClassesTaken] = useState([]);
  const [requirementsTaken, setRequirementsTaken] = useState([]);
  const [electivesTaken, setElectivesTaken] = useState([]);
  const [dcTaken, setDcTaken] = useState([]);
  const [capstoneTaken, setCapstoneTaken] = useState([]);
  const [creditsTaken, setCreditsTaken] = useState(0);
  const [password, setPassword] = useState('');
  const { currentUser } = useAuth();
  const dbRef = ref(getDatabase());
  useEffect(() => {
    if (currentUser) {
      function fetchUser() {
        console.log('current user in user context', currentUser);
        get(child(dbRef, 'Users/' + currentUser.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('snapshot in user context: ', snapshot.val());
            setFirstName(snapshot.val().firstName);
            setLastName(snapshot.val().lastName);
            setMajor(snapshot.val().major);
            setSeniority(snapshot.val().seniority);
            setCatalog(snapshot.val().catalog);
            setCurrentClasses(currentClasses => [...currentClasses, snapshot.val().currentClasses]);
            setPassword(snapshot.val().password);
            setEmail(snapshot.val().email);
            setClassesTaken(snapshot.val().classesTaken);
            setRequirementsTaken(snapshot.val().requirementsTaken);
            setElectivesTaken(snapshot.val().electivesTaken);
            setCapstoneTaken(snapshot.val().capstoneTaken);
            setDcTaken(snapshot.val().dcTaken);
            setCreditsTaken(snapshot.val().creditsTaken);
          } else {
            console.log('no data');
          }
        }).catch((error) => {
          console.log(error);
        });
      };
      fetchUser();
    }
  }, [dbRef, currentUser]);

  return (
    <UserContext.Provider value={{
      email, firstName, lastName, major, seniority, catalog, currentClasses, classesTaken, requirementsTaken,
      password, electivesTaken, capstoneTaken, dcTaken, creditsTaken
    }}>
      {children}
    </UserContext.Provider>
  );
}
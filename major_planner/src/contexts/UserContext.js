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
  const { currentUser } = useAuth();
  const dbRef = ref(getDatabase());

  useEffect(() => {
    if (currentUser) {
      function fetchUser() {
        console.log(currentUser);
        get(child(dbRef, 'Users/' + currentUser.uid)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log('snapshot: ', snapshot.val());
            setFirstName(snapshot.val().firstName);
            setLastName(snapshot.val().lastName);
            setEmail(snapshot.val().email);
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
    <UserContext.Provider value={{ email, firstName, lastName }}>
      {children}
    </UserContext.Provider>
  );
}
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, updateEmail, EmailAuthProvider,
  reauthenticateWithCredential, updatePassword, signOut
} from 'firebase/auth';
import { update } from 'firebase/database';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUSer] = useState();

  /*Function for user sign up*/
  // Uses firebase auth to create a user
  function signUp(email, password) {
    console.log('Signing up with credentials: ', email, password);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Function from firebase that signs in a user
  function signIn(email, password) {
    console.log('Signing in with credentials: ', email, password);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Function from firebase that logs out a user
  // the local storage (classes taken, credits, etc.)
  // is deleted so that a new user doesnt pick it up
  function logOut(){
    signOut(auth).then(() => {
      console.log('Log Out was successful');
    }).catch((error) => {
      alert('There was an error logging out: ', error);
    })
  }

  // updates the inforamtion of a user
  function updateUser(first, last, mail) {
    console.log('Current user: ', auth.currentUser, mail);
    const db = getDatabase();
    // TO DO: need to make a pop up that asks user to re authenticate
    /*updateEmail(auth.currentUser, mail).then(() => {
    }).catch((error) => {
      console.log('Error: ', error);
    });*/
    update(ref(db, 'Users/' + auth.currentUser.uid), {
      firstName: first,
      lastName: last,
      email: mail
    });
  }

  // Update a user password using firebase Auth functions
  function updateUserPassword(oldPassword, newPassword, newPasswordConfirm) {
    if (newPassword !== newPasswordConfirm) return false;
    const user = auth.currentUser;
    const credentials = EmailAuthProvider.credential(user.email, oldPassword);
    let succeded = false;
    reauthenticateWithCredential(user, credentials)
      .then((success) => {
        succeded = true;
        console.log('Current user: ', auth.currentUser, newPassword);
      }).catch((error) => { console.log('Error: ', error); });
    if (succeded) updatePassword(user, newPassword);
    return succeded;
  }

  // update the academic status of a user
  function updateAcademicStatus(newMajor, newSeniority, newCatalog) {
    const db = getDatabase();
    update(ref(db, 'Users/' + auth.currentUser.uid), {
      major: newMajor,
      seniority: newSeniority,
      catalog: newCatalog
    });
  }
  function updateCurrentClasses(classes) {
    const db = getDatabase();
    update(ref(db, 'Users/' + auth.currentUser.uid), {
      currentClasses: classes
    });
  }

  /** useEffect Hook makes it so that it only does it once,
      rather than during every render */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUSer(user);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, logOut,updateUser, updateUserPassword, updateAcademicStatus }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
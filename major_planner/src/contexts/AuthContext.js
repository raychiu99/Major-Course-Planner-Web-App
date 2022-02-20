import React, {useContext, useState, useEffect} from 'react';
import {auth} from '../firebase-config'
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, updateEmail} from 'firebase/auth';
import { update } from 'firebase/database';
import { get, getDatabase, ref, query, child, orderByChild } from "firebase/database";
const AuthContext = React.createContext();

export function AuthProvider({children}){
  const [currentUser, setCurrentUSer] = useState();
  // const [loading, setLoading] = useState(true);
  
  /*Function for user sign up*/
  function signUp(email, password) {
    console.log('Signing up with credentials: ', email,password);
    return createUserWithEmailAndPassword(auth,email, password);
  }
  function signIn(email, password) {
    console.log('Signing in with credentials: ', email, password);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function updateUser (first, last, mail) {
    console.log('Current user: ', auth.currentUser, mail);
    const db = getDatabase();
    // TO DO: need to make a pop up that asks user to re authenticate
    /*updateEmail(auth.currentUser, mail).then(() => {
    }).catch((error) => {
      console.log('Error: ', error);
    });*/
    update(ref(db,'Users/'+auth.currentUser.uid), {
      firstName: first,
      lastName: last
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
    <AuthContext.Provider value = {{currentUser, signIn, signUp, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
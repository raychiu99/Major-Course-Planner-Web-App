import React, {useContext, useState, useEffect} from 'react';
import {auth} from '../firebase-config'
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged} from 'firebase/auth';
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
    <AuthContext.Provider value = {{currentUser, signIn, signUp}}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
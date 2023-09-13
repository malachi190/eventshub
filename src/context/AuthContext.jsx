import React, { useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email, password) {
    try {
      await setPersistence(auth, browserSessionPersistence).then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      });
    } catch (e) {
      console.log("error", e);
    }
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsub;
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyB2PAeutOMu74VL07ER4sYQkHD-9yPpoVY",
  authDomain: "eventshub-bb03e.firebaseapp.com",
  projectId: "eventshub-bb03e",
  storageBucket: "eventshub-bb03e.appspot.com",
  messagingSenderId: "1077559139875",
  appId: "1:1077559139875:web:52378cb1f00b9c4d2ddb96",
  measurementId: "G-J5Z7W5ZPKE",
});

export const auth = getAuth(app);
export default app;

export const db = getFirestore(app)

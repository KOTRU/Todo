import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDm_Swr17wAhSDlF452kw9ooGVP6Nh2pl4",
  authDomain: "todoproject-6a1c1.firebaseapp.com",
  databaseURL: "https://todoproject-6a1c1.firebaseio.com",
  projectId: "todoproject-6a1c1",
  storageBucket: "todoproject-6a1c1.appspot.com",
  messagingSenderId: "180728316548",
  appId: "1:180728316548:web:e2f0d5b4bd88013e2378d1",
  measurementId: "G-F0NHL9JBKB",
};
const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

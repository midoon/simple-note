// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGnLifo1rS1H5EataErCY2sNFvu9qfTis",
  authDomain: "simple-note-279ae.firebaseapp.com",
  projectId: "simple-note-279ae",
  storageBucket: "simple-note-279ae.appspot.com",
  messagingSenderId: "791318375678",
  appId: "1:791318375678:web:f112303ff6d09ae409c9af",
  measurementId: "G-Y961WVW5SX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp;

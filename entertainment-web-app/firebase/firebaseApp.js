// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHFFJjZpSkc-OYyXcvKSkElE-nPqnDc-8",
  authDomain: "entertainment-stream-app.firebaseapp.com",
  projectId: "entertainment-stream-app",
  storageBucket: "entertainment-stream-app.appspot.com",
  messagingSenderId: "994223411773",
  appId: "1:994223411773:web:5e59bb0c7c8d602734d054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log(db);

export { db, auth };

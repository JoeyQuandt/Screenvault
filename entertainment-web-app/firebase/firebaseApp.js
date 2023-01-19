// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXvwVEJtuM1RTPi6cLA-T3zQ-QV4sjZWw",
  authDomain: "entertainment-web-app-27d8d.firebaseapp.com",
  projectId: "entertainment-web-app-27d8d",
  storageBucket: "entertainment-web-app-27d8d.appspot.com",
  messagingSenderId: "242990668293",
  appId: "1:242990668293:web:23569c6e2acc7388371a6c",
  measurementId: "G-M0K142Y1E8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
  return app;
};

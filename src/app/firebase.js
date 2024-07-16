// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiTHtq1_B8zfhmTPRRtLeuty9REy1x_tQ",
  authDomain: "expense-tracker-d3ef3.firebaseapp.com",
  projectId: "expense-tracker-d3ef3",
  storageBucket: "expense-tracker-d3ef3.appspot.com",
  messagingSenderId: "619328638339",
  appId: "1:619328638339:web:e6bbcf4cec73ff4b583ab6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
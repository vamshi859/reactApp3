// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeApp} from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCezORr_n3Rk4rC0bVcT_dZGWI2rDprAs0",
  authDomain: "edit-profile-pic.firebaseapp.com",
  projectId: "edit-profile-pic",
  storageBucket: "edit-profile-pic.appspot.com",
  messagingSenderId: "203823826532",
  appId: "1:203823826532:web:f8e672b05628fb8c5b8171"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const projectFirestore = getFirestore;
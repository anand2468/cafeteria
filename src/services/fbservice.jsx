// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4AIdwQSTfOwVuCMV744b93zfoyrvBOSE",
    authDomain: "recepies-9f90d.firebaseapp.com",
    projectId: "recepies-9f90d",
    storageBucket: "recepies-9f90d.appspot.com",
    messagingSenderId: "379964317214",
    appId: "1:379964317214:web:a99715744316f5098bd80f",
    measurementId: "G-D39TDDZXFF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDop18gtZgrlKs_RGVapdn1M_I0jokDC3c",
  authDomain: "hellostranger-dd307.firebaseapp.com",
  projectId: "hellostranger-dd307",
  storageBucket: "hellostranger-dd307.firebasestorage.app",
  messagingSenderId: "314488540762",
  appId: "1:314488540762:web:d6c56e6fb49f0036fe5263",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


export default app;




// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGZN6pbbZ2fdMBt8hS4dVQeUK3976Gm9I",
  authDomain: "mern-board-3c037.firebaseapp.com",
  projectId: "mern-board-3c037",
  storageBucket: "mern-board-3c037.appspot.com",
  messagingSenderId: "176943927870",
  appId: "1:176943927870:web:4a08c01e0271b9bcadb76f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAlgoPhdqmP6l4uvmYVWC0muwsOJ4KEsns",
    authDomain: "kinraimaa.firebaseapp.com",
    projectId: "kinraimaa",
    storageBucket: "kinraimaa.appspot.com",
    messagingSenderId: "765091157794",
    appId: "1:765091157794:web:6b88592ba951007796777b",
    measurementId: "G-92L4L2LT23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirebase = () => {
    return app;
}
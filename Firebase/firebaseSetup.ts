// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC.apiKey,
    authDomain: process.env.EXPO_PUBLIC.authDomain,
    projectId: process.env.EXPO_PUBLIC.projectId,
    storageBucket: process.env.EXPO_PUBLIC.storageBucket,
    messagingSenderId: process.env.EXPO_PUBLIC.messagingSenderId,
    appId: process.env.EXPO_PUBLIC.appId,
    measurementId: process.env.EXPO_PUBLIC.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
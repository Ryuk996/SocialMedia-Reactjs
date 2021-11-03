// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";       //todo
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa18L5sN2d--mJlohy0U-CkXW4k1Ow3Ko",
  authDomain: "socialmedia-b19c3.firebaseapp.com",
  projectId: "socialmedia-b19c3",
  storageBucket: "socialmedia-b19c3.appspot.com",
  messagingSenderId: "464608410211",
  appId: "1:464608410211:web:bfce6d4630e4adb06c9656"
};

// Initialize Firebase                                              //todo
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app,db,storage};
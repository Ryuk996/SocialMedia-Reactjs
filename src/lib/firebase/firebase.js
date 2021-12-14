// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";       //todo
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// import firebase from "firebase/app";

// Your web app's Firebase configuration
//2//
// const firebaseConfig = {
//   apiKey: "AIzaSyB9fwA0V1ROY6jm3H8pTDlfGq3m67gjiXs",
//   authDomain: "sociagram-5b07c.firebaseapp.com",
//   projectId: "sociagram-5b07c",
//   storageBucket: "sociagram-5b07c.appspot.com",
//   messagingSenderId: "689830322821",
//   appId: "1:689830322821:web:c16ed6c67423b3f52b7fec"
// };
//1//
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
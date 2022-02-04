import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeiwqbKltqhXHNjEA_fPih8wE--JObr_Q",
  authDomain: "project-one-36662.firebaseapp.com",
  projectId: "project-one-36662",
  storageBucket: "project-one-36662.appspot.com",
  messagingSenderId: "955640162601",
  appId: "1:955640162601:web:beab52243b16f9f837ef38",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

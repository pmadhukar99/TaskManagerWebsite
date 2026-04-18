// Firebase Configuration
// Get your config from: firebase.google.com → Project Settings

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// REPLACE WITH YOUR FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyBwuqsmm_nGU0eRESFFPqyDK9blzqVP6hM",
  authDomain: "taskmanager-9bd1b.firebaseapp.com",
  projectId: "taskmanager-9bd1b",
  storageBucket: "taskmanager-9bd1b.firebasestorage.app",
  messagingSenderId: "557681664433",
  appId: "1:557681664433:web:4d48963c6a8f951dbf9d90",
  measurementId: "G-SCWHRDM16W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

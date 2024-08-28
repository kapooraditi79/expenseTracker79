// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9cQSQYBHZZfm5xXaujG36D8mMigc7CDk",
  authDomain: "expensetracker-92bc9.firebaseapp.com",
  projectId: "expensetracker-92bc9",
  storageBucket: "expensetracker-92bc9.appspot.com",
  messagingSenderId: "408820473514",
  appId: "1:408820473514:web:4f14d134bec8bdb8293ad3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

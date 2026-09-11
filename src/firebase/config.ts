import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBDQUu41FSedfdMrpG41hqgNDVVBqxXMNk",
  authDomain: "autotracky32.firebaseapp.com",
  databaseURL: "https://autotracky32-default-rtdb.firebaseio.com",
  projectId: "autotracky32",
  storageBucket: "autotracky32.firebasestorage.app",
  messagingSenderId: "89292069230",
  appId: "1:89292069230:web:559bb072a45b9c2e01097f",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);

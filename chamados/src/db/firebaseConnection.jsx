import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG3xzaHhtd_5MzQN_g9tPP7DRopRkUQt8",
  authDomain: "tickets-df6ff.firebaseapp.com",
  projectId: "tickets-df6ff",
  storageBucket: "tickets-df6ff.appspot.com",
  messagingSenderId: "40098392604",
  appId: "1:40098392604:web:15726a3fbda69e1ac84dd9",
  measurementId: "G-51DVLB9472",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const storage = getStorage(app);

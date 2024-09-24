import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDap7-SXusy12ojj--9KmeBTsqwdg22Jdo",
  authDomain: "project-portal-5a03b.firebaseapp.com",
  projectId: "project-portal-5a03b",
  storageBucket: "project-portal-5a03b.appspot.com",
  messagingSenderId: "977388847590",
  appId: "1:977388847590:web:58d16bc867ced1177d5627",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

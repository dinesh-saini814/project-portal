"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import UserProjects from "./UserProjects";
import UserInfo from "./UserInfo";
import PublicProjects from "../publicProjecrs/PublicProjects";

const GetUserData = () => {
  // Define state variables to hold user data
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    userEmail: "",
    profileImage: "",
  });

  const [projects, setProjects] = useState([]);
  const [publicProjects, setPublicProjects] = useState([]);
  const [userId, setUserId] = useState(null);

  const projectCollection = collection(db, "Projects");

  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
        setUserInfo({
          userName: user.displayName,
          userEmail: user.email,
          profileImage: user.photoURL,
        });
      } else {
        setUserInfo({
          userName: "",
          userEmail: "",
          profileImage: "",
        });
        setUser(null);
        console.log("No user is signed in.");
      }
    });
  }, [user]);

  useEffect(() => {
    setProjects([]); // Clear projects before fetching new ones
    const getUserProjects = async () => {
      try {
        const q = query(projectCollection, where("userName", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setProjects((prevProjects) => [...prevProjects, doc.data()]);
        });
      } catch (error) {
        console.log("Error getting documents:", error);
      }
    };

    if (user) {
      getUserProjects(); // Fetch projects only when user is available
    }
  }, [user, userId]); // Only run when the user state changes

  // get public projects

  useEffect(() => {
    setPublicProjects([]); // Clear projects before fetching new ones
    const getPublicProjects = async () => {
      try {
        const q = query(projectCollection, where("isPublic", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setPublicProjects((prevProjects) => [...prevProjects, doc.data()]);
        });
      } catch (error) {
        console.log("Error getting documents:", error);
      }
    };

    if (user) {
      getPublicProjects(); // Fetch projects only when user is available
    }
  }, [user, userId]); // Only run when the user state changes

  return (
    <div>
      <UserInfo userInfo={userInfo} />
      <UserProjects UserProjects={projects} />
    </div>
  );
};

export default GetUserData;

"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import PublicProjects from "../publicProjecrs/PublicProjects";

const GetPublicProjects = () => {
  // Define state variables to hold user data
  const [user, setUser] = useState(null);

  const [publicProjects, setPublicProjects] = useState([]);

  const projectCollection = collection(db, "Projects");

  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        console.log("No user is signed in.");
      }
    });
  }, [user]);

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

    getPublicProjects(); // Fetch projects only when user is available
  }, [user]); // Only run when the user state changes

  return (
    <div>
      <PublicProjects publicPro={publicProjects} />
    </div>
  );
};

export default GetPublicProjects;

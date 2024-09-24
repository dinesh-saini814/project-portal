"use client";
import { auth, db } from "@/app/config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const projectCollection = collection(db, "Projects");

  // Check if user is authenticated and get their UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserId(currentUser.uid);
      } else {
        setUser(null);
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const q = query(projectCollection, where("userName", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.log("Error getting documents:", error);
      }
    };

    if (user) {
      getUserProjects(); // Fetch projects only when user is available
    }
  }, [user]); // Only run when the user state changes

  return (
    <div>
      {/* Projects Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold text-purple-600 mb-6">
          My Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project Card */}
          <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img
              src=""
              alt="Project Thumbnail"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-black mb-2">
              Project Title
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A short description of the project goes here, explaining its
              purpose and key features.
            </p>
            {/* Tags */}
            <div className="flex space-x-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                React
              </span>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                Firebase
              </span>
            </div>
          </div>

          {/* Repeat for other projects */}
          <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img
              src=""
              alt="Project Thumbnail"
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-black mb-2">
              Project Title
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              A short description of the project goes here, explaining its
              purpose and key features.
            </p>
            <div className="flex space-x-2">
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                Flutter
              </span>
              <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
                Tailwind
              </span>
            </div>
          </div>

          {/* Add more project cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default UserProjects;

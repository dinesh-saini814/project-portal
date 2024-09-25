"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/app/config/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    userId: "",
    name: "",
    email: "",
    photoURL: "",
  });

  // Function to save user info to Firestore
  const saveProject = async () => {
    if (!userInfo.userId) return; // Don't proceed unless userId is set

    const userDocRef = doc(db, "Users", userInfo.userId);

    try {
      // Check if user info is already stored in sessionStorage
      const isUserSaved = sessionStorage.getItem(
        `user_saved_${userInfo.userId}`
      );
      if (isUserSaved) {
        console.log(
          "User already saved in this session, skipping Firestore save"
        );
        return;
      }

      // Check if the user already exists in Firestore
      const docSnapshot = await getDoc(userDocRef);

      if (!docSnapshot.exists()) {
        // If the document doesn't exist, create a new one
        await setDoc(userDocRef, {
          userId: userInfo.userId,
          name: userInfo.name,
          email: userInfo.email,
          photoURL: userInfo.photoURL,
        });
        console.log("New user info saved to Firestore");
        // Mark the user as saved in this session
        sessionStorage.setItem(`user_saved_${userInfo.userId}`, "true");
      } else {
        console.log("User already exists in Firestore, no action taken");
      }
    } catch (error) {
      console.error("Error adding/updating document: ", error);
    }
  };

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserInfo({
          userId: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
        // Only save project if the user is not already in sessionStorage
        if (!sessionStorage.getItem(`user_saved_${user.uid}`)) {
          saveProject();
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Loading ends after checking the auth state
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsDropdownOpen(false); // Close the dropdown on sign out
      setLoading(false); // Make sure to reset loading after logout
      sessionStorage.clear(); // Clear session storage on logout
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.querySelector(".dropdown");
      // Check if the click was outside of the dropdown or profile icon
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div></div>; // Add a spinner or loading screen here if necessary
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          {/* Show user profile picture */}
          <div className="relative dropdown">
            <Image
              src={user.photoURL}
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={toggleDropdown} // Toggle the dropdown
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-auto sm:w-40">
                <ul className="flex flex-col gap-2 p-4 text-black">
                  <li
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    Dashboard
                  </li>
                  <li
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={logOut}
                  >
                    Sign Out
                  </li>
                </ul>
              </div>
            )}
          </div>
        </>
      ) : (
        <button
          onClick={googleSignIn}
          className="sm:w-28 h-5 p-5 bg-purple-300 rounded-full text-white flex-center"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default SignIn;

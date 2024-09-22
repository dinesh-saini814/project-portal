"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/app/config/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
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
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <div></div>;
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
                <ul className="flex flex-col gap-2 p-4">
                  <li
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => router.push("/dashboard")}
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
          className="sm:w-28 h-5 p-5 bg-purple-300 rounded-full text-white"
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default SignIn;

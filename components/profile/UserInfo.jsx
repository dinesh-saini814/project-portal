"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { LiaEditSolid } from "react-icons/lia";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const UserInfo = () => {
  // Define state variables to hold user data
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserName(user.displayName);
        setUserEmail(user.email);
        setProfileImage(user.photoURL);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return (
    <div className="bg-purple-50 p-6">
      {/* Profile Section */}
      <div className="relative bg-white shadow-md rounded-lg p-6 mb-10 max-w-4xl mx-auto">
        <div className="flex  items-center gap-4 sm:gap-10">
          {/* Profile Image */}
          <Image
            src={profileImage}
            alt="User Profile"
            priority
            quality={40}
            className="rounded-full shadow-lg mb-4 "
            width={128}
            height={128}
          />
          {/* User Info */}
          <div className="flex-col">
            <h1 className="text-2xl font-bold text-purple-500 mb-2">
              {userName}
            </h1>
            <p className="text-gray-700 text-sm mb-4 text-center">
              {userEmail}
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-black hover:text-purple-500 transition-colors"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="#"
                className="text-black hover:text-purple-500 transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="#"
                className="text-black hover:text-purple-500 transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        {/* Pencil icon for editing profile */}
        <Link
          href="/dashboard/edit-profile"
          className="sm:px-3 w-10 sm:w-20 py-1 gap-1 flex-center text-black sm:border-[1px] border-purple-300 rounded-lg absolute top-5 right-5"
        >
          <LiaEditSolid className="size-6 sm:size-4" />
          <span className="hidden sm:block">Edit</span>
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;

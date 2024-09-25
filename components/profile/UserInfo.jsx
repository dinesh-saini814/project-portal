import Image from "next/image";
import { LiaEditSolid } from "react-icons/lia";
import Link from "next/link";
import { user } from "@nextui-org/theme";

const UserInfo = (userInfo) => {
  const userName = userInfo.userInfo.userName || "NO USER FOUND";
  const userEmail = userInfo.userInfo.userEmail;
  const profileImage =
    userInfo.userInfo.profileImage ||
    "https://i.ibb.co/948VB6x/icons8-user-96.png";
  console.log(userInfo);

  if (!userInfo.userInfo) return null;

  return (
    <div className="bg-purple-50 p-6">
      {/* Profile Section */}
      <div className="relative bg-gray-100 shadow-md rounded-[3rem] p-6 mb-10 max-w-3xl h-[22rem] mx-auto flex flex-col justify-end">
        <div className=" flex flex-col items-center text-center gap-4 sm:gap-5">
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
      </div>
    </div>
  );
};

export default UserInfo;

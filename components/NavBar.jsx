"use client";
import SignIn from "./SignIn";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  return (
    <div>
      <nav className="flex justify-between items-center p-4">
        <h1 className="w-16 sm:w-fit text-lg leading-6 sm:text-2xl font-bold text-purple-400">
          Project Portal
        </h1>

        <div className="hidden sm:flex gap-5">
          <h1 className="text-black text-base font-semibold underline cursor-pointer pt-5">
            Explore/ Feed
          </h1>
        </div>

        <div className=" flex gap-1 sm:gap-5">
          <button
            className="w-42 h-5 p-5 bg-black rounded-full text-white flex-center"
            onClick={() => router.push("/new-post")}
          >
            <span className="hidden sm:block">Create Project</span>
            <HiMiniPencilSquare className="sm:hidden" />
          </button>
          <SignIn />
          {/* <LogOut /> */}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

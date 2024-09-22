import SignIn from "./SignIn";
import { HiMiniPencilSquare } from "react-icons/hi2";
// import LogOut from "./LogOut";

const NavBar = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4">
        <h1 className="w-16 sm:w-fit text-lg leading-6 sm:text-2xl font-bold text-purple-400">
          Project Portal
        </h1>

        <div className=" flex gap-1 sm:gap-5">
          <button className="w-42 h-5 p-5 bg-black rounded-full text-white flex-center">
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

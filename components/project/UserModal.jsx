import { useState, useEffect } from "react";
import { FaGithub, FaYoutube, FaFigma } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import DeleteProjectButton from "./DeleteProjectButton";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const UserModal = ({ project, isOpen, onClose, projectId }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close dropdown on clicking outside
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // console.log("project id is", projectId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Close modal on clicking the overlay
      ></div>

      {/* Modal content */}
      <div className="bg-white shadow-lg p-6 z-10 max-w-[70vw] max-h-[100vh] rounded-[3rem] transition-size duration-300 ease-in">
        <button
          className="absolute w-10 h-10 top-10 left-10 text-white shadow-sm bg-transparent hover:bg-gray-400 transition-all rounded-full rotate-180 scale-110"
          onClick={onClose}
        >
          ➜
        </button>

        <div className="sm:flex transition-size duration-300 ">
          <div className="w-full h-full sm:w-1/2 rounded-[3rem]">
            <img
              src={project.thumbnailImage}
              alt={project.title}
              className="w-full max-h-[90vh] rounded-[1rem] object-cover"
            />
          </div>
          <div className="w-1/2 h-[32rem] pl-8 pt-6 text-black flex flex-col gap-4 overflow-y-auto relative">
            {/* Project Title and Three-dot Menu */}
            <div className="flex justify-between items-center">
              <h1 className="font-sans text-2xl">{project.title}</h1>
              <div className="relative">
                <HiDotsVertical
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div className="dropdown absolute top-full right-0 bg-white shadow-md rounded-lg p-2">
                    {/* Dropdown Options */}
                    <DeleteProjectButton projectId={projectId} />
                  </div>
                )}
              </div>
            </div>

            {project.portfolioUrl && (
              <a className="link" href={project.portfolioUrl} target="_blank">
                My Portfolio ↗
              </a>
            )}

            {project.demoUrl && (
              <a
                className="w-28 h-10 rounded-full bg-purple-200 flex-center hover:bg-purple-300 transition-all"
                href={project?.demoUrl}
                target="_blank"
              >
                <span className="p-3">Visit Site 🡥</span>
              </a>
            )}

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">Tags :</h2>
              {project.tags && (
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {project.skills && (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold">Skills :</h2>
                <div className="flex flex-wrap gap-3">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-3">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank">
                  <FaGithub />
                  GitHub ↗
                </a>
              )}

              {project.youtubeUrl && (
                <a href={project.youtubeUrl} target="_blank">
                  <FaYoutube /> youtube ↗
                </a>
              )}

              {project.figmaUrl && (
                <a href={project.figmaUrl} target="_blank">
                  <FaFigma />
                  Figma ↗
                </a>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">Description :</h2>
              <p className="text-sm">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;

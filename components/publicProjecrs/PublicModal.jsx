import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaGithub, FaYoutube, FaFigma } from "react-icons/fa";

const PublicModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  console.log("project all info", project);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Close modal on clicking the overlay
      ></div>

      {/* Modal content */}
      <div className="bg-white shadow-lg p-4  sm:p-6 z-10 w-full sm:w-[70vw] max-h-[100vh] sm:rounded-[3rem]  transition-size duration-300 ease-in md:max-w-[90vw] sm:max-w-[95vw] flex flex-col flex-wrap">
        <button
          className="absolute w-10 h-10 top-5 left-2 sm:top-10 sm:left-10  bg-black text-white  shadow-sm sm:bg-transparent hover:bg-gray-400 transition-all rounded-full  rotate-180 sm:scale-110"
          onClick={onClose}
        >
          ➜
        </button>

        <div className="sm:flex flex-col md:flex-row transition-size duration-300 overflow-scroll sm:my-0 my-10">
          <div className="w-full  h-full sm:w-1/2 rounded-[3rem] md:w-1/2 ">
            <img
              src={project.thumbnailImage}
              alt={project.title}
              className="w-full max-h-[90vh] rounded-[1rem] object-cover "
            />
          </div>
          <div className="w-full h-[32rem] pl-8 pt-6 text-black flex flex-col gap-4 sm:overflow-y-auto md:w-1/2">
            <h1 className=" font-sans text-2xl">{project.title}</h1>
            {project.portfolioUrl ? (
              <a className="link" href={project.portfolioUrl} target="_blank">
                My Portfolio ↗
              </a>
            ) : null}
            {project.demoUrl ? (
              <a
                className="w-28 h-10 rounded-full bg-purple-200 flex-center hover:bg-purple-300 transition-all"
                href={project?.demoUrl}
                target="_blank"
              >
                <span className="p-3">Visit Site 🡥</span>
              </a>
            ) : null}
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">Tags :</h2>
              {project.tags ? (
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
              ) : null}
            </div>
            {project.skills ? (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold">Skills :</h2>
                <div className="flex  flex-wrap gap-3">
                  {project.skills.map((skills, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      {skills}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-4 mt-3 ">
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank">
                  <FaGithub />
                  GitHub ↗
                </a>
              ) : null}

              {project.youtubeUrl ? (
                <a href={project.youtubeUrl} target="_blank">
                  {" "}
                  <FaYoutube /> youtube ↗
                </a>
              ) : null}
              {project.figmaUrl ? (
                <a href={project.figmaUrl} target="_blank">
                  <FaFigma />
                  Figma ↗
                </a>
              ) : null}
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">Description :</h2>
              <p className="text-sm ">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicModal;

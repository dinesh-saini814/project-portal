import { useState } from "react";
import UserModal from "../project/UserModal";

const UserProjects = (project) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (projectItem) => {
    setSelectedProject(projectItem); // Set the selected project item
    setModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Close modal
    setSelectedProject(null);
  };

  return (
    <div>
      {project.UserProjects ? (
        <div className="lg:columns-4 sm:columns-2  columns-1  md:columns-3 space-y-4 p-4 gap-4 m-3">
          {project.UserProjects.map((item) => (
            <div>
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg  overflow-auto cursor-pointer hover:scale-[.97] transition-all duration-300"
                style={{ gridRowEnd: `span ${Math.ceil(item.height / 10)}` }} // Span dynamically based on content height
                onClick={() => handleOpenModal(item)} // Pass the clicked item
              >
                {/* Replace 'item.height' with actual height calculation or content */}
                <img
                  src={item?.thumbnailImage}
                  alt="images"
                  className="h-auto rounded-lg mb-4 "
                />{" "}
                {/* Project image placeholder */}
                <h3 className="text-lg font-semibold text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {
                    item.tags
                      ? item.tags.map((tags, i) => (
                          <span
                            key={i}
                            className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded-full"
                          >
                            {tags}
                          </span>
                        ))
                      : null // Optional fallback text
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {selectedProject && (
        <UserModal
          project={selectedProject}
          projectId={selectedProject.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserProjects;

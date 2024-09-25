import { db } from "@/app/config/firebase";
import { doc, deleteDoc } from "firebase/firestore"; // Import Firestore methods
import { useRouter } from "next/navigation";

const DeleteProjectButton = ({ projectId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Projects", projectId)); // Delete document by ID
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <button
      className="text-red-500 hover:bg-gray-200 p-2 rounded-md"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
};

export default DeleteProjectButton;

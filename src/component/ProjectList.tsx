import React, { useEffect, useState } from "react";
import { useProjects } from "../context/ProjectProvider";
import { toast } from "react-toastify";

import Loading from "./Loading";

const ProjectList = () => {
  const { projects, fetchProjects, deleteProject, setEditingProject } =
    useProjects();
  const [loading, setLoading] = useState(true); // Add loading state
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null); // Track project to delete

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching
      await fetchProjects();
      setLoading(false); // Set loading to false after fetching
    };

    fetchData();
  }, []);

  const confirmDelete = (id: string) => {
    setProjectToDelete(id); // Set the project to delete
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete); // Delete the project
      toast.success("Project deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      setProjectToDelete(null); // Clear the project to delete
    } catch (error) {
      toast.error("Failed to delete the project. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Projects</h1>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500">
                Created By: {project.createdBy}
              </p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(project.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Updated At: {new Date(project.updatedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => setEditingProject(project)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => confirmDelete(project.id!)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this project? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setProjectToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
import React, { useState, useEffect } from "react";
import { useProjects } from "../context/ProjectProvider";
import { toast } from "react-toastify";

const ProjectForm = () => {
  
  const {
    addProject,
    updateProject,
    editingProject,
    setEditingProject,
  } = useProjects();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProject) {
      setName(editingProject.name);
      setDescription(editingProject.description);
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        // Update existing project
        await updateProject(editingProject.id!, {
          name,
          description,
          createdBy: editingProject.createdBy,
          createdAt: editingProject.createdAt,
          updatedAt: new Date().toISOString(),
        });
        toast.success("Project updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
        setEditingProject(null); // Clear editing state
      } else {
        // Add new project
        await addProject({
          name,
          description,
          createdBy: "defaultUser", // Replace with actual user if available
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        toast.success("Project added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      }

      setName("");
      setDescription("");
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
      console.error("Error during CRUD operation:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setName("");
    setDescription("");
    toast.info("Edit canceled.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {editingProject ? "Edit Project" : "Add Project"}
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className={`${
            editingProject ? "bg-blue-500" : "bg-green-500"
          } text-white px-4 py-2 rounded`}
        >
          {editingProject ? "Update Project" : "Add Project"}
        </button>
        {editingProject && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
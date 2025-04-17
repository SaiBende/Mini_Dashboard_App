import  { createContext, useContext, useState, ReactNode } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthProvider";

interface Project {
  id?: string;
  name: string;
  description: string;
  createdBy: string; // User's name who created the project
  createdAt: string; // Timestamp when the project was created
  updatedAt: string; // Timestamp when the project was last updated
}

interface ProjectContextType {
  projects: Project[];
  fetchProjects: () => Promise<void>;
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setEditingProject: (project: Project | null) => void;
  editingProject: Project | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const fetchedProjects = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Project[];
    setProjects(fetchedProjects);
  };
  const { user } = useAuth();
  const addProject = async (project: Project) => {
    const newProject = {
      ...project,
      createdBy: user?.displayName || "Unknown User", // Replace with the actual user's name from context
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, "projects"), newProject);
    setProjects((prev) => [...prev, { id: docRef.id, ...newProject }]);
  };

  const updateProject = async (id: string, project: Project) => {
    const updatedProject = {
      ...project,
      updatedAt: new Date().toISOString(),
    };
    const projectRef = doc(db, "projects", id);
    await updateDoc(projectRef, updatedProject);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedProject } : p))
    );
  };

  const deleteProject = async (id: string) => {
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
        editingProject,
        setEditingProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
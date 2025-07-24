import axios from "axios";

import { useEffect, useState } from "react";

import ProjectCard from "../../components/projectcard/projectCard";
import "./projects.css";
type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url?: string;
  stack: { id: number; name: string; url: string }[];
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects`,
          {
            withCredentials: true,
          },
        );
        setProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects">
      {projects.map((project: ProjectType) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

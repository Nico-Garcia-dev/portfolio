import axios from "axios";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import ProjectCard from "../../components/projectcard/projectCard";
import "./projects.css";
import type { ProjectType } from "../../types/definitions/definitions";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="projects"
    >
      {projects.map((project: ProjectType) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}

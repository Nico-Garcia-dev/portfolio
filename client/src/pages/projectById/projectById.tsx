import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProjectCard from "../../components/projectcard/projectCard";
import type { ProjectType } from "../../types/definitions/definitions";

export default function ProjectById() {
  const [project, setProject] = useState<ProjectType | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
          {
            withCredentials: true,
          },
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="project-by-id"
      >
        <ProjectCard project={project} />
      </motion.div>
    </>
  );
}

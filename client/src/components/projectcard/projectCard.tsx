import "./projectCard.css";

import { useNavigate } from "react-router";

type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url?: string;
  stacks: { id: number; name: string; image_url: string }[];
};

export default function ProjectCard({ project }: { project: ProjectType }) {
  const navigate = useNavigate();
  const imgBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <article className="card-content">
        <button
          type="button"
          className="image-container"
          onClick={() => navigate(`/projects/${project.id}`)}
          aria-label={`Voir les détails du projet ${project.name}`}
        >
          <img
            className="card-image"
            src={`${imgBaseUrl}${project.image_url}`}
            alt={`${project.name} thumbnail`}
          />
        </button>
        <div className="card-text">
          <p>{project.description}</p>
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lien vers le projet sur GitHub
          </a>
          <div className="card-stack">
            {project.stacks && project.stacks.length > 0 && (
              <div className="project-stack">
                <h4>Stack du projet</h4>
                <ul>
                  {project.stacks.map((stack) => (
                    <li key={stack.id}>
                      <div className="stack-icon">
                        <img src={stack.image_url} alt={stack.name} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

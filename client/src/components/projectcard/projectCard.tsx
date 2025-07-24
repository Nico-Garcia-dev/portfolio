import "./projectCard.css";

type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url?: string;
  stack: { id: number; name: string; url: string }[];
};

export default function ProjectCard({ project }: { project: ProjectType }) {
  const imgBaseUrl = import.meta.env.VITE_API_URL;
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <article className="card-content">
        <img
          className="card-image"
          src={`${imgBaseUrl}${project.image_url}`}
          alt={`${project.name} thumbnail`}
        />
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
            {project.stack && project.stack.length > 0 && (
              <div className="project-stack">
                <h4>Stack du projet</h4>
                <ul>
                  {project.stack.map((stack) => (
                    <img key={stack.id} src={stack.url} alt={stack.name} />
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

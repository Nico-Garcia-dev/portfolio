import DatabaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";

type Project = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  image_url: string;
};

class ProjectRepository {
  async readAll() {
    const [result] = await DatabaseClient.query<Result>(
      "SELECT * FROM projects INNER JOIN stack ON project.id = stack.project_id",
    );
    return result.insertId;
  }
  async create(project: Omit<Project, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO projects (name, description, github_url, image_url) VALUES (?, ?, ?, ?)",
      [
        project.name,
        project.description,
        project.github_url,
        project.image_url,
      ],
    );
    return result.insertId;
  }
}
export default new ProjectRepository();

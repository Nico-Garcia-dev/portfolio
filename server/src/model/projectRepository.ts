import DatabaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";

type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
};

class ProjectRepository {
  async readAll() {
    const [result] = await DatabaseClient.query<Result>(
      "SELECT * FROM projects INNER JOIN stack ON project.id = stack.project_id",
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM projects WHERE id = ?",
      [id],
    );
    return rows[0] as ProjectType;
  }

  async create(project: ProjectType, imagePath: string) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO projects (name, description, github_url, image_url) VALUES (?, ?, ?, ?)",
      [project.name, project.description, project.github_url, imagePath],
    );
    return result.insertId;
  }

  async delete(id: number) {
    const [result] = await DatabaseClient.query<Result>(
      "DELETE FROM projects WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}
export default new ProjectRepository();

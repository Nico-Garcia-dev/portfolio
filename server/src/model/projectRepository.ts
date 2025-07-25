import DatabaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";
import type { ParsedNewProjectType } from "../lib/definitions";

type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
};

class ProjectRepository {
  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
        p.*,
        JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'name', s.name, 'image_url', s.image_url)) AS stacks
      FROM 
        projects as p
      INNER JOIN 
        project_stack as ps ON p.id = ps.project_id
      INNER JOIN 
        stack as s ON ps.stack_id = s.id
      GROUP BY 
        p.id
    `,
    );
    return rows;
  }

  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT * FROM projects WHERE id = ?",
      [id],
    );
    return rows[0] as ProjectType;
  }

  async create(project: ParsedNewProjectType, imagePath: string) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO projects (name, description, github_url, image_url) VALUES (?, ?, ?, ?)",
      [project.title, project.description, project.github_url, imagePath],
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

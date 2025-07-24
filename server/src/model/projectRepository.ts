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
    // Une seule requête qui récupère tous les projets et leurs stacks associées
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
        p.id, p.name, p.description, p.github_url, p.image_url, p.created_at,
        s.id AS stack_id, s.name AS stack_name, s.image_url AS stack_url
      FROM 
        projects p
      INNER JOIN 
        project_stack ps ON p.id = ps.project_id
      INNER JOIN 
        stack s ON ps.stack_id = s.id
      ORDER BY 
        p.id`,
    );

    // Structure pour stocker les projets transformés
    const projectsMap = new Map();

    // Type pour les lignes de résultat
    type ResultRowType = {
      id: number;
      name: string;
      description: string;
      github_url: string;
      image_url?: string;
      created_at?: string;
      stack_id?: number;
      stack_name?: string;
      stack_url?: string;
    };

    // Parcourir les résultats et regrouper les stacks par projet
    for (const row of rows as ResultRowType[]) {
      if (!projectsMap.has(row.id)) {
        // Créer une nouvelle entrée de projet
        projectsMap.set(row.id, {
          id: row.id,
          name: row.name,
          description: row.description,
          github_url: row.github_url,
          image_url: row.image_url,
          created_at: row.created_at,
          stack: [],
        });
      }

      // Si le projet a une stack associée, l'ajouter au tableau de stacks
      if (row.stack_id) {
        const project = projectsMap.get(row.id);
        project.stack.push({
          id: row.stack_id,
          name: row.stack_name,
          url: row.stack_url,
        });
      }
    }

    // Convertir la Map en tableau de projets
    return Array.from(projectsMap.values());
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

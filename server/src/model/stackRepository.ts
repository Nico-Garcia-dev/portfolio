import DatabaseClient from "../../database/client";
import type { Result } from "../../database/client";

type StackType = {
  id: number;
  name: string;
};

class StackRepository {
  async create(stack: string[], projectId: number) {
    const [result] = await DatabaseClient.query<Result>(
      "INSERT INTO project_stack (stack_id, project_id) VALUES ?",
      [stack.map((stack) => [stack, projectId])],
    );
    return result.insertId;
  }
}

export default new StackRepository();

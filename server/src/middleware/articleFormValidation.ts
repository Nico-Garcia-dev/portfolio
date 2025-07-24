import type { RequestHandler } from "express";
import { z } from "zod";
import type { ZodSafeParseResult } from "zod";
import type { ParsedNewProjectType } from "../lib/definitions";

const validateProject: RequestHandler = (req, res, next) => {
  const { title, github_url, description, stack } = req.body;

  const parsedstacks = JSON.parse(req.body.stack);

  const parsedItems: ParsedNewProjectType = {
    title,
    github_url,
    description,
    parsedstacks,
  };

  const projectSchema = z.object({
    title: z.string().min(2).max(45),
    github_url: z.string().min(2).max(255),
    description: z.string().min(2).max(500),
    parsedstacks: z.array(z.string()),
  });

  const validData: ZodSafeParseResult<ParsedNewProjectType> =
    projectSchema.safeParse({
      title,
      github_url,
      description,
      parsedstacks,
    });

  if (!validData.success) {
    const errors: Record<string, string> = validData.error.issues.reduce<
      Record<string, string>
    >((acc, val) => {
      acc[String(val.path[0])] = val.message;
      return acc;
    }, {});

    res.status(400).json({ "Recipe validation errors:": errors });
    return;
  }
  req.body = parsedItems;
  next();
};

export default validateProject;

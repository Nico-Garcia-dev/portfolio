import type { RequestHandler } from "express";

import type { ParsedNewProjectType } from "../lib/definitions";
import { normalizeImagePath } from "../middleware/upload";
import projectRepository from "../model/projectRepository";
import stackRepository from "../model/stackRepository";

type ProjectType = {
  id: number;
  name: string;
  description: string;
  github_url: string;
  stack?: number[];
};

const browse: RequestHandler = async (req, res) => {
  try {
    const project = await projectRepository.readAll();
    res.status(200).json(project);
  } catch (error) {
    res
      .status(401)
      .json({ error: "projectAction: impossible de récupérer les projets" });
  }
};
const read: RequestHandler = async (req, res) => {
  try {
    const projectId = Number.parseInt(req.params.id);
    const project = await projectRepository.read(projectId);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      error: "projectAction: impossible de récupérer le projet",
      details: error,
    });
  }
};

const add: RequestHandler = async (req, res) => {
  const { parsedstacks, ...rest } = req.body as ParsedNewProjectType;
  const imagePath = normalizeImagePath(req.file?.path);

  try {
    const insertId: number = await projectRepository.create(
      rest as ParsedNewProjectType,
      imagePath as string,
    );

    const addStack = await stackRepository.create(parsedstacks, insertId);

    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(401).json({
      error: "projectAction: impossible de créer le projet",
      details: error,
    });
  }
};

const destroy: RequestHandler = async (req, res) => {
  const projectId = Number.parseInt(req.params.id);
  try {
    const deletedId = await projectRepository.delete(projectId);
    res.status(200).json({
      message: "Project deleted successfully",
      deletedId: deletedId,
    });
  } catch (error) {
    res.status(401).json({
      error: "projectAction: impossible de supprimer le projet",
      details: error,
    });
  }
};

export default {
  browse,
  read,
  add,
  destroy,
};

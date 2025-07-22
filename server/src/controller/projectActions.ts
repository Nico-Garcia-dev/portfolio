import type { RequestHandler } from "express";

import projectRepository from "../model/projectRepository";

type ProjectType = {
  id?: number;
  name: string;
  description: string;
  github_url: string;
  image_url: string;
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
const read: RequestHandler = (req, res) => {
  res.json({ message: "Read project" });
};

const add: RequestHandler = async (req, res) => {
  const newProject: ProjectType = {
    name: req.body.name,
    description: req.body.description,
    github_url: req.body.github_url,
    image_url: req.body.image_url,
  };
  try {
    const insertId: number = await projectRepository.create(newProject);
    res.status(201).json({ id: insertId });
  } catch (error) {
    res.status(401).json({
      error: "projectAction: impossible de créer le projet",
      details: error,
    });
  }
};

export default {
  browse,
  read,
  add,
};

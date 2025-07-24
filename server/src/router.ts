import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import projectActions from "./controller/projectActions";
import articleFormValidation from "./middleware/articleFormValidation";
import upload from "./middleware/upload";

/** Project Routes */

router.get("/api/projects", projectActions.browse);
router.get("/api/projects/:id", projectActions.read);
router.post(
  "/api/el-barto",
  upload.single("image"),
  articleFormValidation,
  projectActions.add,
);
router.delete("/api/el-barto/:id", projectActions.destroy);

import itemActions from "./modules/item/itemActions";

/** Stack route */
router.get("/api/stack", itemActions.browse);

export default router;

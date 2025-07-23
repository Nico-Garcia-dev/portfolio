import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import projectActions from "./controller/projectActions";
import upload from "./middleware/upload";

/** Project Routes */

router.get("/api/el-barto", projectActions.browse);
router.get("/api/el-barto/:id", projectActions.read);
router.post("/api/el-barto", upload.single("image"), projectActions.add);
router.delete("/api/el-barto/:id", projectActions.destroy);

export default router;

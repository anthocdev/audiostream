import express from "express";
import YoutubeStreamController from "./controllers/stream";

/* List of routes */
const router = express.Router();

router.post("/ytbstream", YoutubeStreamController.getStream);

export default router;

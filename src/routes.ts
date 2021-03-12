import express from "express";
import YoutubeStreamController from "./controllers/stream";

/* List of routes */
const router = express.Router();

router.get("/ytbstream", YoutubeStreamController.getStream);

export default router;

import { NextFunction, Request, Response } from "express";
import { getYoutubeStream } from "../services/youtubestream";

/* Returns audio track of any YouTube video */
const getStream = async (req: Request, res: Response, next: NextFunction) => {
  const url = req.body?.url; //YouTube video URL for streaming
  try {
    var stream = getYoutubeStream(url)
      .on("error", (err) => {
        console.log(err);
        res.status(404).send(err);
      })
      .once("data", function () {
        res.set("content-type", "audio/mp3");
        res.set("accept-ranges", "bytes");
      })
      .on("data", (chunk) => {
        res.write(chunk);
      })
      .on("end", res.end.bind(res)); //Finished chunk response
  } catch (ex) {
    console.log(ex);
    res.status(500).send(ex);
  }
};

export default { getStream };

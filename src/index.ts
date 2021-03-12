import YoutubeStream from "./helpers/youtubestream";
import { Lame } from "node-lame";
import fs from "fs";

var decoder = new Lame({ output: "./audio/demo.wav" });

var testfile = fs.createWriteStream("test.mp3");

var stream = new YoutubeStream(
  "https://www.youtube.com/watch?v=cIjlhhcSir4"
).getStream();

stream.pipe(testfile);

stream.on("end", () => {
  console.log("stream end");
});

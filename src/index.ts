import YoutubeStream from "./helpers/youtubestream";
import { Lame } from "node-lame";

var stream = new YoutubeStream(
  "https://www.youtube.com/watch?v=RPfCZhvj1Ng"
).getStream();

stream.pipe(new Lame({ output: "./audio/kek.wav" }).setBuffer(stream));
// var activestream = stream.getStream().pipe(new Lame({output:"./audio/kek.wav"}).setBuffer());

// activestream.on("data", (chunk: any) => {
//   console.log(chunk);
// });

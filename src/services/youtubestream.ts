/* Returns audio stream from YouTube videos. */
/* Appended source from https://github.com/JamesKyburz/youtube-audio-stream */
import ytdl from "ytdl-core";
const { PassThrough } = require("stream");
import fs from "fs";
import FFmpeg from "fluent-ffmpeg";
import { Stream } from "node:stream";

function getYoutubeStream(url: any, opt?: any): Stream {
  var opt: any = {
    ...opt,
    videoFormat: "mp4",
    quality: "lowest",
    audioFormat: "mp3",
    filter(format: any) {
      return format.container === opt.videoFormat && format.audioBitrate;
    },
  };

  const { file, audioFormat } = opt;
  const stream = file ? fs.createWriteStream(file) : new PassThrough();
  const video = ytdl(url, opt).on("error", (err) => {
    console.log(err.message); //@todo: route to err
  });
  const ffmpeg = FFmpeg(video);

  process.nextTick(() => {
    const output = ffmpeg.format(audioFormat).pipe(stream);
    ffmpeg.on("error", (error: any) => stream.emit("error", error));
    output.on("error", (error: any) => {
      video.destroy;
      stream.emit("error", +error);
    });
  });

  stream.video = video;
  stream.ffmpeg = ffmpeg;

  return stream;
}

export { getYoutubeStream };

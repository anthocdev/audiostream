/* Returns audio stream from YouTube videos. */
/* Appended source from https://github.com/JamesKyburz/youtube-audio-stream */
import ytdl from "ytdl-core";
const { PassThrough } = require("stream");
import fs from "fs";
import FFmpeg from "fluent-ffmpeg";

export default class YoutubeStream {
  youtubeUrl: string = "";
  constructor(url: string) {
    this.youtubeUrl = url;
  }

  getStream(opt?: any) {
    var opt: any = {
      ...opt,
      videoFormat: "mp4",
      quality: "lowest",
      audioFormat: "mp3",
      filter(format: any) {
        return format.container === opt.videoFormat && format.audioBitrate;
      },
    };

    const video = ytdl(this.youtubeUrl, opt);
    const { file, audioFormat } = opt;
    const stream = file ? fs.createWriteStream(file) : new PassThrough();
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
}

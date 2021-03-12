import YoutubeStream from "../services/youtubestream";

const getStream = async (req: any, res: any, next: any) => {
  //   const { video_url } = req.body;

  var stream = new YoutubeStream(
    "https://www.youtube.com/watch?v=JtabQvTbmhs"
  ).getStream();

  stream.pipe(res);

  stream.on("end", () => {
    console.log("stream end");
  });
};

export default { getStream };

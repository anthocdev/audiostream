import express from "express";
import routes from "./routes";

const server = express();

server.get("/", (req, res) => {
  res.send("API UP");
});

server.use("/api", routes);

server.listen(3000, () => console.log("Running on Port 3000"));

export default server;

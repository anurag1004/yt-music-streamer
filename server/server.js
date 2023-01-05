const express = require("express"),
  app = express(),
  ytdl = require("ytdl-core"),
  listenMusicHandler = require("./middlewares/listenMusicHandler"),
  getPlaylistVideos = require("./helper/getPlaylistVideos.helper");
// allow cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})
app.get("/info/:id", async (req, res) => {
  try {
    const info = await  ytdl.getBasicInfo(req.params.id);
    res.send(info.videoDetails);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end("internal system error");
    }
  }
});
app.get("/playlist/:playlistId",async(req, res)=>{
    try{
        const playlist = await getPlaylistVideos(req.params.playlistId)
        res.send(playlist)
    }catch(err){
        console.error(err);
        if (!res.headersSent) {
            res.writeHead(500);
            res.end("internal system error");
        }
    }
})
app.get("/listen/:id", listenMusicHandler);
app.listen(3000, () => console.log("listening on port 3000"));

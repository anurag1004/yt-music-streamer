const cacheCleaner = require("./cron/cache.cleaner");

const express = require("express"),
  app = express(),
  ytdl = require("ytdl-core"),
  cron = require("node-cron"),
  listenMusicHandler = require("./middlewares/listenMusicHandler"),
  getPlaylistVideos = require("./helper/getPlaylistVideos.helper");
  // clean cach files at every 15 minute
  cron.schedule("*/15 * * * *", cacheCleaner)
  // allow cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})
app.get("/info/:id", async (req, res) => {
  try {
    const info = await  ytdl.getBasicInfo(req.params.id,{filter: "audioonly", opusEncoded: true});
    const details = {
      thumbnail:
        info.player_response.microformat.playerMicroformatRenderer.thumbnail
          .thumbnails[0].url,
      author: info.videoDetails.author.name,
      title: info.videoDetails.title,
      channel_url: info.videoDetails.author.channel_url,
    };
    res.send(details);
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
app.get("/playsong/:id", listenMusicHandler);
app.listen(3000, () => console.log("listening on port 3000"));

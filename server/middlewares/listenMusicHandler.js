async function listenMusicHandler(req, res) {
    try {
      ytdl(`https://www.youtube.com/watch?v=${req.params.id}`, {
        filter: "audioonly",
      })
        // stream to res and add name to response header
        // add an image to the response header
        .pipe(res, {
          end: true,
          headers: { "Content-Type": "audio/mpeg" },
          status: 200,
        });
    } catch (err) {
      console.error(err);
      if (!res.headersSent) {
        res.writeHead(500);
        res.end("internal system error");
      }
    }
  }

  module.exports = listenMusicHandler;
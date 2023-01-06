const ytdl = require("ytdl-core"),
  fs = require("fs"),
  readline = require("readline");

const onProgress = (chunkLength, downloaded, total) => {
  const percent = downloaded / total;
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
  process.stdout.write(
    `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
      total /
      1024 /
      1024
    ).toFixed(2)}MB)`
  );
};
const sendFile = (req, res, filePath) => {
  var stat = fs.statSync(filePath);
  var total = stat.size;
  if (req.headers.range) {
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    var start = parseInt(partialstart, 10);
    var end = partialend ? parseInt(partialend, 10) : total - 1;
    var chunksize = end - start + 1;
    // validate start and end
    if (start >= total || end >= total) {
      res.writeHead(416, { "Content-Range": "bytes */" + total });
      res.end();
      return;
    }
    var readStream = fs.createReadStream(filePath, { start: start, end: end });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "audio/mpeg",
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "audio/mpeg",
    });
    fs.createReadStream(filePath).pipe(res);
  }
};
async function listenMusicHandler(req, res) {
  try {
    // videoId for cache
    const outpath = `./cache/${req.params.id}.mp3`;
    // check if file exist in cache
    if (fs.existsSync(outpath)) {
      console.log(`file ${req.params.id} exist in cache`)
      sendFile(req, res, outpath);
      return;
    }
    console.log(`file ${req.params.id} not exist in cache`)
    // stream to res and add name to response header
    ytdl(`https://www.youtube.com/watch?v=${req.params.id}`, {
      filter: "audioonly",
    })
      .on("progress", onProgress)
      .pipe(fs.createWriteStream(outpath))
      .on("finish", () => {
        sendFile(req, res, outpath);
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

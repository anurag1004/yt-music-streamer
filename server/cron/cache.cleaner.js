// clean cach files
const fs = require("fs");
const path = require("path");
const cacheCleaner = ()=>{
    const cacheDir = path.join(__dirname, "../cache");
    const cacheFiles = fs.readdirSync(cacheDir);
    cacheFiles.forEach((file) => {
        fs.unlink(path.join(cacheDir, file), (err) => {
            if (err) {
                console.error(err);
            }
        })
    })
    console.log('cache files deleted by cache cleaner cron job')
}
module.exports = cacheCleaner;